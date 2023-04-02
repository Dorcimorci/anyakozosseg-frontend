import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { forkJoin, Observable, switchMap, take } from 'rxjs';
import { Brand, MinimalBrand } from '../../brands-page/brand-model/brand.model';
import { BrandsService } from '../../brands-page/brands-service/brands.service';
import { CategoriesService } from '../../shared/categories/categories.service';
import { Category } from '../../shared/categories/category.model';
import { OptionItem } from '../../shared/dropdown/option.model';
import { PageAction } from '../../shared/enums';
import { Utils } from '../../shared/utils';
import {
  ProductApiPostRequest,
  ProductApiPutRequest,
  Subcategory,
} from '../product-model/product.api';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  selectedSubcategories: Subcategory[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
  };

  public categories: Category[] = [];
  public brands: MinimalBrand[] = [];
  public subcategories: Subcategory[] = [];

  public product: Product = {
    id: 0,
    name: '',
    categoryName: '',
    imageFile: '',
    subcategories: [],
    priceRange: { min: 2000, max: 5000 },
    brandName: '',
    canHelp: '',
    packaging: '',
    numberOfRatings: 0,
    avgRating: 0,
    ratings: [],
  };

  public get categoryOptions(): string[] {
    const categoryOptions: string[] = [];
    this.categories?.forEach((category: Category) =>
      categoryOptions.push(category.name)
    );
    return categoryOptions;
  }

  public get brandOptions(): string[] {
    return this.brands.map((brand: MinimalBrand) => brand.name);
  }

  public pageAction: PageAction = PageAction.Create;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly categoryService: CategoriesService,
    private readonly brandService: BrandsService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;

    // Fetch categories and brands in parallel
    forkJoin([
      this.categoryService.getCategories(),
      this.brandService.fetchAllBrands(),
    ])
      .pipe(
        // Use switchMap to chain the subcategories request
        switchMap(([categories, brands]) => {
          this.categories = categories;
          this.product.categoryName = categories[0].name;
          this.brands = brands.length
            ? brands
            : [{ id: 0, name: 'No brands available' }];
          this.product.brandName = this.brands[0].name;

          // Fetch subcategories for the first category
          return this.productService.fetchSubcategories(
            this.getCategoryId(this.product.categoryName)
          );
        })
      )
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      });

    if (this.pageAction === PageAction.Update) {
      forkJoin([
        this.categoryService.getCategories(),
        this.brandService.fetchAllBrands(),
      ])
        .pipe(
          switchMap(([categories, brands]) => {
            this.categories = categories;
            this.brands = brands.length
              ? brands
              : [{ id: 0, name: 'No brands available' }];
            this.product.brandName = this.brands[0].name;
            const productId: number =
              +this.activatedRoute.snapshot.paramMap.get('productId')!;
            return this.productService.fetchProductDetailsById(productId);
          }),
          switchMap((product: Product) => {
            this.product = product;
            return this.productService.fetchSubcategories(
              this.getCategoryId(this.product.categoryName)
            );
          })
        )
        .subscribe((subcategories: Subcategory[]) => {
          this.subcategories = subcategories;
          this.selectedSubcategories = this.product.subcategories.map(
            (subcategoryName: string) =>
              this.subcategories.find(
                (subcategory: Subcategory) =>
                  subcategory.name === subcategoryName
              )!
          );
          console.log('selected:', this.selectedSubcategories);
        });
    }
  }

  public fetchSubcategories(categoryName: string) {
    if (this.categories.length > 0) {
      this.productService
        .fetchSubcategories(this.getCategoryId(categoryName))
        .subscribe(
          (subcategories: Subcategory[]) => (this.subcategories = subcategories)
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

  public mapModelToPostRequest(product: Product): ProductApiPostRequest {
    const productApiPostRequest: ProductApiPostRequest = {
      ...product,
      categoryId: this.getCategoryId(product.categoryName),
      brandId: this.getBrandId(product.brandName),
      subcategories: this.selectedSubcategories,
    };
    return productApiPostRequest;
  }

  public mapModelToPutRequest(product: Product): ProductApiPutRequest {
    const productApiPostRequest: ProductApiPutRequest = {
      ...product,
      categoryId: this.getCategoryId(product.categoryName),
      brandId: this.getBrandId(product.brandName),
      subcategories: this.selectedSubcategories,
    };
    return productApiPostRequest;
  }

  public getCategoryId(name: string): number {
    const foundCategory: Category | undefined = this.categories.find(
      (category: Category) => category.name === name
    );
    return foundCategory ? foundCategory.id : this.categories[0].id;
  }

  public getCategoryName(id: number): string {
    const foundCategory: Category | undefined = this.categories.find(
      (category: Category) => category.id === id
    );
    return foundCategory ? foundCategory.name : this.categories[0].name;
  }

  public getBrandId(name: string): number {
    const foundBrand: MinimalBrand | undefined = this.brands.find(
      (brand: MinimalBrand) => brand.name === name
    );
    return foundBrand ? foundBrand.id : this.brands[0].id;
  }

  public getBrandName(id: number): string {
    const foundBrand: MinimalBrand | undefined = this.brands.find(
      (brand: MinimalBrand) => brand.id === id
    );
    return foundBrand ? foundBrand.name : this.brands[0].name;
  }

  public getProductCategoryId(name: string): number {
    const foundProductCategory: Subcategory | undefined =
      this.subcategories.find(
        (productCategory: Subcategory) => productCategory.name === name
      );
    return foundProductCategory
      ? foundProductCategory.id
      : this.subcategories[0].id;
  }

  public getProductCategoryName(id: number): string {
    const foundProductCategory: Subcategory | undefined =
      this.subcategories.find(
        (productCategory: Subcategory) => productCategory.id === id
      );
    return foundProductCategory
      ? foundProductCategory.name
      : this.subcategories[0].name;
  }

  public onSubmit(): void {
    if (this.pageAction === PageAction.Create) {
      this.productService
        .addNewProduct(this.mapModelToPostRequest(this.product))
        .subscribe((response: { productId: number }) =>
          this.router.navigate(['/products/details', response.productId])
        );
    } else if (this.pageAction === PageAction.Update) {
      this.productService
        .updateProduct(this.mapModelToPutRequest(this.product))
        .subscribe((response: { productId: number }) =>
          this.router.navigate(['/products/details', response.productId])
        );
    }
  }
}
