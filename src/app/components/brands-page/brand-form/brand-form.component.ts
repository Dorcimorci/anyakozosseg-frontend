import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { CategoriesService } from '../../shared/categories/categories.service';
import { Category } from '../../shared/categories/category.model';
import { PageAction, PriceCategoryOption } from '../../shared/enums';
import { booleanOptions, Utils } from '../../shared/utils';
import {
  BrandApiPostRequest,
  BrandApiPutRequest,
} from '../brand-model/brand.api';
import { Brand } from '../brand-model/brand.model';
import { BrandsService } from '../brands-service/brands.service';
import { PriceCategory } from '../price-category/price-category.model';
import { PriceCategoryService } from '../price-category/price-category.service';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent implements OnInit {
  public get Utils() {
    return Utils;
  }

  public priceCategories: PriceCategory[] = [];

  public categories: Category[] = [];

  public booleanOptions: string[] = booleanOptions;

  public brand: Brand = {
    overallRating: 0,
    priceCategory: PriceCategoryOption.Low,
    isCrueltyFree: Utils.mapBooleanToText(false),
    isVegan: Utils.mapBooleanToText(false),
  } as Brand;

  public get PriceCategoryOptions(): string[] {
    return Object.values(PriceCategoryOption);
  }

  public get CategoryOptions(): string[] {
    const categoryOptions: string[] = [];
    this.categories?.forEach((category: Category) =>
      categoryOptions.push(category.name)
    );
    return categoryOptions;
  }

  public pageAction: PageAction = PageAction.Create;

  public brand$: Observable<Brand> | null = null;

  public ratingOptions: number[] = [1, 2, 3, 4, 5];

  constructor(
    private readonly brandService: BrandsService,
    private readonly priceCategoryService: PriceCategoryService,
    private readonly categoryService: CategoriesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly brandsService: BrandsService
  ) {
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;
    if (this.pageAction === PageAction.Create) {
      this.priceCategoryService
        .fetchPriceCategories()
        .subscribe((priceCategories: PriceCategory[]) => {
          this.priceCategories = priceCategories;
        });

      this.categoryService
        .getCategories()
        .subscribe((categories: Category[]) => {
          this.categories = categories;
          this.brand.categoryName = categories[0].name;
        });
    } else if (this.pageAction === PageAction.Update) {
      const brandId: string | null =
        this.activatedRoute.snapshot.paramMap.get('brandId');
      if (brandId) {
        this.brand$ = combineLatest([
          this.brandsService.fetchBrandById(+brandId),
          this.priceCategoryService.fetchPriceCategories(),
          this.categoryService.getCategories(),
        ]).pipe(
          tap(([brand, priceCategories, categories]) => {
            this.priceCategories = priceCategories;
            this.categories = categories;
          }),
          map(([brand, priceCategories, categories]) => ({
            id: brand.id,
            isCrueltyFree: Utils.mapBooleanToText(brand.isCrueltyFree),
            isVegan: Utils.mapBooleanToText(brand.isCrueltyFree),
            name: brand.name,
            overallRating: brand.overallRating,
            priceCategory: this.getPriceCategoryOption(brand.priceCategoryId),
            imageFile: brand.imageFile,
            categoryName: this.getCategoryName(brand.categoryId),
          }))
        );
      }
    }
  }

  public ngOnInit(): void {
    this.brand$?.subscribe((brand: Brand) => {
      this.brand = brand;
    });
  }

  public mapBooleanToText(bool: boolean): string {
    return Utils.mapBooleanToText(bool);
  }

  public onStarClicked(rating: number) {
    this.brand.overallRating = rating;
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
            this.brand.imageFile = fileContent;
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
          this.brand.imageFile = fileContent;
        }
      );
    }
  }

  public mapModelToPostRequest(brand: Brand): BrandApiPostRequest {
    const brandApiPostRequest: BrandApiPostRequest = {
      isCrueltyFree: Utils.mapTextToBoolean(brand.isCrueltyFree),
      isVegan: Utils.mapTextToBoolean(brand.isVegan),
      name: brand.name.toUpperCase(),
      overallRating: brand.overallRating,
      priceCategoryId: this.getPriceCategoryId(brand.priceCategory),
      imageFile: brand.imageFile,
      categoryId: this.getCategoryId(brand.categoryName!),
    };
    return brandApiPostRequest;
  }

  public mapModelToPutRequest(brand: Brand): BrandApiPutRequest {
    const brandApiPutRequest: BrandApiPutRequest = {
      isCrueltyFree: Utils.mapTextToBoolean(brand.isCrueltyFree),
      isVegan: Utils.mapTextToBoolean(brand.isVegan),
      name: brand.name.toUpperCase(),
      overallRating: brand.overallRating,
      priceCategoryId: this.getPriceCategoryId(brand.priceCategory),
      imageFile: brand.imageFile,
      categoryId: this.getCategoryId(brand.categoryName!),
      id: brand.id,
    };
    return brandApiPutRequest;
  }

  public getCategoryId(name: string): number {
    const foundCategory: Category | undefined = this.categories.find(
      (category: Category) => category.name === name
    );
    return foundCategory ? foundCategory.id : this.priceCategories[0].id;
  }

  public getCategoryName(id: number): string {
    const foundCategory: Category | undefined = this.categories.find(
      (category: Category) => category.id === id
    );
    return foundCategory ? foundCategory.name : this.categories[0].name;
  }

  public getPriceCategoryId(option: PriceCategoryOption): number {
    const foundPriceCategory: PriceCategory | undefined =
      this.priceCategories.find(
        (priceCategory: PriceCategory) => priceCategory.name === option
      );

    return foundPriceCategory
      ? foundPriceCategory.id
      : this.priceCategories[0].id;
  }

  public getPriceCategoryOption(id: number): PriceCategoryOption {
    const foundPriceCategory: PriceCategory | undefined =
      this.priceCategories.find(
        (priceCategory: PriceCategory) => priceCategory.id === id
      );
    return foundPriceCategory
      ? (foundPriceCategory.name as PriceCategoryOption)
      : (this.priceCategories[0].name as PriceCategoryOption);
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
      this.brandService
        .addNewBrand(this.mapModelToPostRequest(this.brand))
        .subscribe((response: any) => {
          this.router.navigate([
            '/brands/details',
            PageAction.Read,
            response.brandId,
          ]);
        });
    } else if (this.pageAction === PageAction.Update) {
      this.brandService
        .updateBrand(this.mapModelToPutRequest(this.brand))
        .subscribe((response: any) => {
          this.router.navigate([
            '/brands/details',
            PageAction.Read,
            response.brandId,
          ]);
        });
    }
  }
}
