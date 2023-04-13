import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { forkJoin, switchMap } from 'rxjs';
import { BrandsService } from '../../brands-page/brands-service/brands.service';
import { CategoriesService } from '../../shared/categories/categories.service';
import { Category } from '../../shared/categories/category.model';
import { PageAction } from '../../shared/enums';
import { Utils } from '../../shared/utils';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';
import { Option } from '../../shared/dropdown/dropdown.model';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { IngredientsService } from '../../ingredients-page/ingredients-service/ingredients.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  public readonly baseDropdownSettings: IDropdownSettings =
    Utils.baseDropdownSettings;

  public readonly ingredientsDropdownSettings: IDropdownSettings = {
    ...Utils.baseDropdownSettings,
    allowSearchFilter: true,
  };

  public categories: Category[] = [];
  public brands: Option[] = [];
  public subcategories: Option[] = [];
  public ingredients: Option[] = [];

  public product: Product = {
    id: 0,
    name: '',
    imageFile: '',
    subcategories: [],
    ingredients: [],
    priceRange: { min: 2000, max: 5000 },
    canHelp: '',
    packaging: '',
    numberOfRatings: 0,
    avgRating: 0,
    ratings: [],
    category: Utils.getEmptyOption(),
    brand: Utils.getEmptyOption(),
  };

  public pageAction: PageAction = PageAction.Create;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly categoryService: CategoriesService,
    private readonly brandService: BrandsService,
    private readonly ingredientsService: IngredientsService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;

    // Fetch categories and brands in parallel
    forkJoin([
      this.categoryService.fetchCategories(),
      this.brandService.fetchAllBrands(),
      this.ingredientsService.fetchAllingredients(),
    ])
      .pipe(
        // Use switchMap to chain the subcategories request
        switchMap(([categories, brands, ingredients]) => {
          this.categories = categories;
          this.ingredients = ingredients;
          this.product.category = categories[0];
          this.brands = brands.length
            ? brands
            : [{ id: 0, name: 'No brands available' }];
          this.product.brand = this.brands[0];

          // Fetch subcategories for the first category
          return this.productService.fetchSubcategories(
            this.product.category.id
          );
        })
      )
      .subscribe((subcategories: Option[]) => {
        this.subcategories = subcategories;
      });

    if (this.pageAction === PageAction.Update) {
      forkJoin([
        this.categoryService.fetchCategories(),
        this.brandService.fetchAllBrands(),
        this.ingredientsService.fetchAllingredients(),
      ])
        .pipe(
          switchMap(([categories, brands, ingredients]) => {
            this.categories = categories;
            this.ingredients = ingredients;
            this.brands = brands.length
              ? brands
              : [{ id: 0, name: 'No brands available' }];
            this.product.brand = brands[0];
            const productId: number =
              +this.activatedRoute.snapshot.paramMap.get('productId')!;
            return this.productService.fetchProductDetailsById(productId);
          }),
          switchMap((product: Product) => {
            this.product = product;
            return this.productService.fetchSubcategories(
              this.product.category.id
            );
          })
        )
        .subscribe((subcategories: Option[]) => {
          this.subcategories = subcategories;
        });
    }
  }

  public fetchSubcategories(category: Option | ListItem) {
    if (this.categories.length > 0) {
      this.productService
        .fetchSubcategories(Number(category.id))
        .subscribe(
          (subcategories: Option[]) => (this.subcategories = subcategories)
        );
    }
  }

  public onFileDrop(file: NgxFileDropEntry[]) {
    const droppedFile: NgxFileDropEntry = file[0];
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((droppedFile: File) => {
        Utils.validateAndGetFile(
          droppedFile,
          (event: ProgressEvent<FileReader>) => {
            const fileContent: string = event.target?.result as string;
            this.product.imageFile = fileContent;
          }
        );
      });
    }
  }

  public onFileUpload(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const uploadedFile: File | null = inputElement.files
      ? inputElement.files[0]
      : null;
    if (uploadedFile) {
      Utils.validateAndGetFile(
        uploadedFile,
        (event: ProgressEvent<FileReader>) => {
          const fileContent: string = event.target?.result as string;
          this.product.imageFile = fileContent;
        }
      );
    }
  }

  public mapPageActionToTitleSegment(pageAction: PageAction): string {
    return Utils.mapPageActionToTitleSegment(pageAction);
  }

  public mapPageActionToSubmitButtonLabelSegment(
    pageAction: PageAction
  ): string {
    switch (pageAction) {
      case PageAction.Create:
        return 'HOZZÁADÁSA';
      case PageAction.Update:
        return 'FELÜLÍRÁSA';
      default:
        return '';
    }
  }

  public onSubmit(): void {
    if (this.pageAction === PageAction.Create) {
      this.productService
        .addNewProduct(this.product)
        .subscribe((response: { productId: number }) =>
          this.router.navigate(['/products/details', response.productId])
        );
    } else if (this.pageAction === PageAction.Update) {
      this.productService
        .updateProduct(this.product)
        .subscribe((response: { productId: number }) =>
          this.router.navigate(['/products/details', response.productId])
        );
    }
  }

  public onSelect(listItem: ListItem) {
    console.log(listItem);
  }

  public onBrandsFilterChange(listItem: ListItem): void {
    console.log('onBrandsFilterChange: ', listItem);
  }
}
