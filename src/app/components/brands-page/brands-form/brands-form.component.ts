import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CategoriesService } from '../../shared/categories/categories.service';
import { Category } from '../../shared/categories/category.model';
import { PriceCategoryOption } from '../../shared/enums';
import { booleanOptions, Utils } from '../../shared/utils';
import { BrandApiPostRequest } from '../brand.api';
import { Brand } from '../brand.model';
import { BrandsService } from '../brands.service';
import { PriceCategory } from '../price-category.model';
import { PriceCategoryService } from '../price-category.service';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.scss'],
})
export class BrandsFormComponent {
  public priceCategories: PriceCategory[];

  public categories: Category[];

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

  constructor(
    private readonly brandService: BrandsService,
    private readonly priceCategoryService: PriceCategoryService,
    private readonly categoryService: CategoriesService,
    private readonly router: Router
  ) {
    this.priceCategoryService
      .fetchPriceCategories()
      .subscribe((priceCategories: PriceCategory[]) => {
        this.priceCategories = priceCategories;
      });

    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.brand.category = categories[0].name;
    });
  }

  public ratingOptions: number[] = [1, 2, 3, 4, 5];

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
      fileEntry.file((file: File) => {
        this.processFile(file);
      });
    }
  }

  public onFileUpload(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const uploadedFile: File = inputElement.files
      ? inputElement.files[0]
      : null;
    if (uploadedFile) {
      this.processFile(uploadedFile);
    }
  }

  public processFile(file: File) {
    if (file.type.match(/image\/*/) == null) {
      console.error('Only images are supported.');
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.brand.imageFile = (reader.result as string).split(',')[1];
      };
    }
  }

  public mapModelToPostRequest(): BrandApiPostRequest {
    const brandApiPostRequest: BrandApiPostRequest = {
      isCrueltyFree: Utils.mapTextToBoolean(this.brand.isCrueltyFree),
      isVegan: Utils.mapTextToBoolean(this.brand.isVegan),
      name: this.brand.name.toUpperCase(),
      overallRating: this.brand.overallRating,
      priceCategoryId: this.getPriceCategoryId(this.brand.priceCategory),
      imageFile: this.brand.imageFile,
      categoryId: this.getCategoryId(this.brand.category),
    };
    return brandApiPostRequest;
  }

  public getCategoryId(name: string): number {
    return this.categories.find((category: Category) => category.name === name)
      .id;
  }

  public getPriceCategoryId(option: PriceCategoryOption): number {
    return this.priceCategories.find(
      (priceCategory: PriceCategory) =>
        priceCategory.priceCategoryName === option
    ).id;
  }

  public getPriceCategoryName(id: number): string {
    return this.priceCategories.find(
      (priceCategory: PriceCategory) => priceCategory.id === id
    ).priceCategoryName;
  }

  public onSubmit(): void {
    this.brandService
      .addNewBrand(this.mapModelToPostRequest())
      .subscribe((brandId: number) => {
        this.router.navigate(['/brands/brand-details', brandId]);
      });
  }
}
