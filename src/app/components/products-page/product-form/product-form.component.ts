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
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { IngredientsService } from '../../ingredients-page/ingredients-service/ingredients.service';
import { Option } from '../../shared/single-select/option.model';

/**
 * Component representing the form for creating/editing a product.
 */
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  // Declaration of component properties

  /**
   * Dropdown settings for the base dropdown.
   */
  public readonly baseDropdownSettings: IDropdownSettings =
    Utils.baseDropdownSettings;

  /**
   * Dropdown settings for the ingredients dropdown.
   */
  public readonly ingredientsDropdownSettings: IDropdownSettings = {
    ...Utils.baseDropdownSettings,
    allowSearchFilter: true,
  };

  /**
   * List of categories for the product.
   */
  public categories: Category[] = [];

  /**
   * List of brands for the product.
   */
  public brands: Option[] = [];

  /**
   * List of subcategories for the product.
   */
  public subcategories: Option[] = [];

  /**
   * List of ingredients for the product.
   */
  public ingredients: Option[] = [];

  /**
   * The product being created/edited.
   */
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
    category: {} as Option,
    brand: {} as Option,
  };

  /**
   * The page action (create/update) for the product form.
   */
  public pageAction: PageAction = PageAction.Create;

  /**
   * Constructor for the product form component.
   * @param activatedRoute The ActivatedRoute used to get route parameters.
   * @param categoryService The CategoriesService used to fetch categories.
   * @param brandService The BrandsService used to fetch brands.
   * @param ingredientsService The IngredientsService used to fetch ingredients.
   * @param productService The ProductService used to fetch product details.
   * @param router The Router used for navigation.
   */
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly categoryService: CategoriesService,
    private readonly brandService: BrandsService,
    private readonly ingredientsService: IngredientsService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {
    // Fetch the 'action' parameter from the URL using snapshot and cast it to 'PageAction'
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;

    // Fetch categories, brands, and ingredients in parallel using forkJoin
    forkJoin([
      this.categoryService.fetchCategories(),
      this.brandService.fetchAllBrands(),
      this.ingredientsService.fetchAllingredients(),
    ])
      .pipe(
        // Use switchMap to chain the subcategories request
        switchMap(([categories, brands, ingredients]) => {
          // Update the component's properties with the fetched data
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
        // Update the component's 'subcategories' property with the fetched data
        this.subcategories = subcategories;
      });

    if (this.pageAction === PageAction.Update) {
      // If the 'pageAction' is 'Update', fetch additional data for product update
      forkJoin([
        this.categoryService.fetchCategories(),
        this.brandService.fetchAllBrands(),
        this.ingredientsService.fetchAllingredients(),
      ])
        .pipe(
          switchMap(([categories, brands, ingredients]) => {
            // Update the component's properties with the fetched data
            this.categories = categories;
            this.ingredients = ingredients;
            this.brands = brands.length
              ? brands
              : [{ id: 0, name: 'No brands available' }];
            this.product.brand = brands[0];

            // Fetch product details by ID from URL parameter
            const productId: number =
              +this.activatedRoute.snapshot.paramMap.get('productId')!;
            return this.productService.fetchProductDetailsById(productId);
          }),
          switchMap((product: Product) => {
            // Update the component's 'product' property with the fetched product details
            this.product = product;

            // Fetch subcategories for the product's category
            return this.productService.fetchSubcategories(
              this.product.category.id
            );
          })
        )
        .subscribe((subcategories: Option[]) => {
          // Update the component's 'subcategories' property with the fetched data
          this.subcategories = subcategories;
        });
    }
  }

  /**
   * Fetches subcategories for a given category or listItem.
   * @param category The category or listItem for which subcategories need to be fetched.
   */
  public fetchSubcategories(category: Option | ListItem) {
    if (this.categories.length > 0) {
      this.productService
        .fetchSubcategories(Number(category.id))
        .subscribe(
          (subcategories: Option[]) => (this.subcategories = subcategories)
        );
    }
  }

  /**
   * Handles the file drop event and validates the dropped file.
   * @param file The array of dropped files.
   */
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

  /**
   * Handles the file upload event and validates the uploaded file.
   * @param event The file upload event.
   */
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

  /**
   * Maps a page action to a title segment string.
   * @param pageAction The page action to be mapped.
   * @returns The title segment string corresponding to the page action.
   */
  public mapPageActionToTitleSegment(pageAction: PageAction): string {
    return Utils.mapPageActionToTitleSegment(pageAction);
  }

  /**
   * Maps a page action to a submit button label segment string.
   * @param pageAction The page action to be mapped.
   * @returns The submit button label segment string corresponding to the page action.
   */
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

  /**
   * Handles the form submission based on the current page action.
   * If the page action is 'Create', a new product will be added, and if it's 'Update', the product will be updated.
   * Then it navigates to the details page of the created/updated product by its id.
   */
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
}
