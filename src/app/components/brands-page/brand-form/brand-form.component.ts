import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { combineLatest, firstValueFrom, map, Observable, tap } from 'rxjs';
import { CategoriesService } from '../../shared/categories/categories.service';
import { PageAction, PriceCategoryOption } from '../../shared/enums';
import { booleanOptions, Utils } from '../../shared/utils';
import { Brand } from '../brand-model/brand.model';
import { BrandsService } from '../brands-service/brands.service';
import { PriceCategoryService } from '../price-category/price-category.service';
import { Option } from '../../shared/dropdown/dropdown.model';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent implements OnInit {
  public get Utils() {
    return Utils;
  }

  public get PriceCategoryOptions(): string[] {
    return Object.values(PriceCategoryOption);
  }
  public priceCategories: Option[] = [];
  public categories: Option[] = [];
  public booleanOptions: Option[] = booleanOptions;

  public brand: Brand = {
    overallRating: 0,
    priceCategory: Utils.getEmptyOption(),
    isCrueltyFree: booleanOptions[0],
    isVegan: booleanOptions[0],
  } as Brand;

  public pageAction: PageAction = PageAction.Create;
  public brand$: Observable<Brand> | null = null;

  constructor(
    private readonly brandService: BrandsService,
    private readonly priceCategoryService: PriceCategoryService,
    private readonly categoryService: CategoriesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;

    if (this.pageAction === PageAction.Create) {
      this.fetchOptions().then(() => this.initOptions());
    } else if (this.pageAction === PageAction.Update) {
      const brandId: string | null =
        this.activatedRoute.snapshot.paramMap.get('brandId');
      if (brandId) {
        this.brand$ = combineLatest([
          this.brandService.fetchBrandById(+brandId),
          this.priceCategoryService.fetchPriceCategories(),
          this.categoryService.fetchCategories(),
        ]).pipe(
          tap(([_, priceCategories, categories]) => {
            this.priceCategories = priceCategories;
            this.categories = categories;
          }),
          map(([brand]) => Utils.mapBrandBooleanOptions(brand))
        );
      }
    }
  }

  private async fetchOptions() {
    this.priceCategories = await firstValueFrom(
      this.priceCategoryService.fetchPriceCategories()
    );

    this.categories = await firstValueFrom(
      this.categoryService.fetchCategories()
    );
  }

  private initOptions() {
    this.brand.category = this.categories[0];
    this.brand.priceCategory = this.priceCategories[0];
  }

  public ngOnInit(): void {
    this.brand$?.subscribe((brand: Brand) => {
      this.brand = brand;
    });
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
        .addNewBrand(this.brand)
        .subscribe((response: { brandId: number }) => {
          this.router.navigate(['/brands/details', response.brandId]);
        });
    } else if (this.pageAction === PageAction.Update) {
      this.brandService
        .updateBrand(this.brand)
        .subscribe((response: { brandId: number }) => {
          this.router.navigate(['/brands/details', response.brandId]);
        });
    }
  }
}
