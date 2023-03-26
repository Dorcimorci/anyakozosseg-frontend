import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';
import { Brand, MinimalBrand } from '../../brands-page/brand-model/brand.model';
import { BrandsService } from '../../brands-page/brands-service/brands.service';
import { CategoriesService } from '../../shared/categories/categories.service';
import { Category } from '../../shared/categories/category.model';
import { PageAction } from '../../shared/enums';
import { Utils } from '../../shared/utils';
import {
  ProductApiPostRequest,
  ProductApiPutRequest,
} from '../product-model/product.api';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  public categories: Category[] = [];
  public brands: MinimalBrand[] = [];

  public product: Product = {
    id: 0,
    name: '',
    categoryName: '',
    imageFile: '',
    productCategories: [],
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
    const brandOptions: string[] = [];
    this.brands?.forEach((brand: MinimalBrand) =>
      brandOptions.push(brand.name)
    );
    return brandOptions;
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

    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.product.categoryName = categories[0].name;
    });

    this.brandService.fetchAllBrands().subscribe((brands: MinimalBrand[]) => {
      this.brands = brands;
      this.product.brandName = brands[0].name;
    });
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
    };
    return productApiPostRequest;
  }

  public mapModelToPutRequest(product: Product): ProductApiPutRequest {
    const productApiPostRequest: ProductApiPutRequest = {
      ...product,
      categoryId: this.getCategoryId(product.categoryName),
      brandId: this.getBrandId(product.brandName),
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

  public onSubmit(): void {
    if (this.pageAction === PageAction.Create) {
      this.productService
        .addNewProduct(this.mapModelToPostRequest(this.product))
        .subscribe((response: { productId: number }) =>
          this.router.navigate(['/products/details', response.productId])
        );
    } else if (this.pageAction === PageAction.Update) {
    }
  }
}
