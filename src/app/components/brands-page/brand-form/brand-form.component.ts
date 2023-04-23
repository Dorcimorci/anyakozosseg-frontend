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
import { Option } from '../../shared/single-select/option.model';

/**
 * Represents the Brand Form Component in the Angular application.
 * This component is responsible for managing the form for creating or updating a brand,
 * including handling form submissions, file uploads, and fetching options for dropdowns.
 */
@Component({
  selector: 'app-brands-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent implements OnInit {
  /**
   * Gets the utility methods from the Utils class.
   * @returns {Utils} The Utils class instance.
   */
  public get Utils(): typeof Utils {
    return Utils;
  }

  /**
   * Gets the available price category options.
   * @returns {string[]} An array of available price category options.
   */
  public get PriceCategoryOptions(): string[] {
    return Object.values(PriceCategoryOption);
  }

  /**
   * Represents the list of price categories for the brand form dropdown.
   */
  public priceCategories: Option[] = [];

  /**
   * Represents the list of categories for the brand form dropdown.
   */
  public categories: Option[] = [];

  /**
   * Represents the list of boolean options for the brand form dropdown.
   */
  public booleanOptions: Option[] = booleanOptions;

  /**
   * Represents the brand object being created or updated.
   */
  public brand: Brand = {
    overallRating: 0,
    priceCategory: {} as Option,
    isCrueltyFree: booleanOptions[0],
    isVegan: booleanOptions[0],
  } as Brand;

  /**
   * Represents the page action (create or update) for the brand form.
   */
  public pageAction: PageAction = PageAction.Create;

  /**
   * Represents the brand object as an observable for update actions.
   */
  public brand$: Observable<Brand> | null = null;

  constructor(
    private readonly brandService: BrandsService,
    private readonly priceCategoryService: PriceCategoryService,
    private readonly categoryService: CategoriesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    /**
     * Initializes the page action based on the URL parameter.
     */
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;

    /**
     * Fetches options for dropdowns and initializes them.
     */
    if (this.pageAction === PageAction.Create) {
      this.fetchOptions().then(() => this.initOptions());
    } else if (this.pageAction === PageAction.Update) {
      /**
       * Fetches brand details, price categories, and categories for update action
       * and maps boolean options after fetching the data.
       */
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

  public ngOnInit(): void {
    this.brand$?.subscribe((brand: Brand) => {
      this.brand = brand;
    });
  }

  /**
   * Handles file drop event and updates the image file of the brand.
   * @param {NgxFileDropEntry[]} file - The dropped file entry.
   * @returns {void}
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
            this.brand.imageFile = fileContent;
          }
        );
      });
    }
  }

  /**
   * Handles file upload event and updates the image file of the brand.
   * @param {Event} event - The file upload event.
   * @returns {void}
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
          this.brand.imageFile = fileContent;
        }
      );
    }
  }

  /**
   * Maps page action to title segment for display purposes.
   * @param {PageAction} pageAction - The page action to be mapped.
   * @returns {string} - The title segment corresponding to the page action.
   */
  public mapPageActionToTitleSegment(pageAction: PageAction): string {
    return Utils.mapPageActionToTitleSegment(pageAction);
  }

  /**
   * Maps page action to submit button label segment for display purposes.
   * @param {PageAction} pageAction - The page action to be mapped.
   * @returns {string} - The submit button label segment corresponding to the page action.
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
   * Handles form submission for creating or updating a brand.
   * @returns {Promise<void>} A promise that resolves to the newly inserted or edited brand ID when the form is submitted.
   */
  public onSubmit(): void {
    if (this.pageAction === PageAction.Create) {
      this.brandService.addNewBrand(this.brand).subscribe((brandId: number) => {
        this.router.navigate(['/brands/details', brandId]);
      });
    } else if (this.pageAction === PageAction.Update) {
      this.brandService.updateBrand(this.brand).subscribe((brandId: number) => {
        this.router.navigate(['/brands/details', brandId]);
      });
    }
  }

  /**
   * Fetches options for dropdowns (price categories, categories) for create action.
   * @returns {Promise<void>} A promise that resolves when options are fetched and initialized.
   */
  private async fetchOptions(): Promise<void> {
    try {
      this.priceCategories = await firstValueFrom(
        this.priceCategoryService.fetchPriceCategories()
      );
      this.categories = await firstValueFrom(
        this.categoryService.fetchCategories()
      );
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  }

  private initOptions() {
    this.brand.category = this.categories[0];
    this.brand.priceCategory = this.priceCategories[0];
  }
}
