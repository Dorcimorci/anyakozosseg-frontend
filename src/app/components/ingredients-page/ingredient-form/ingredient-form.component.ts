import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { CategoriesService } from '../../shared/categories/categories.service';
import { PageAction } from '../../shared/enums';
import { booleanOptions, Utils } from '../../shared/utils';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Option } from '../../shared/single-select/option.model';

/**
 * Component for managing ingredient form.
 * This component allows creating and updating ingredients.
 * It includes functionality for handling file drops and file uploads,
 * as well as mapping page actions to title segments and submit button label segments.
 */
@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss'],
})
export class IngredientFormComponent implements OnInit {
  /**
   * Dropdown settings for categories dropdown.
   * @type {IDropdownSettings}
   */
  public readonly categoriesDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
  };

  /**
   * Dropdown settings for functions dropdown.
   * @type {IDropdownSettings}
   */
  public readonly functionsDropdownSettings: IDropdownSettings = {
    ...this.categoriesDropdownSettings,
    allowSearchFilter: true,
    singleSelection: false,
    searchPlaceholderText: 'Keresés',
  };

  /**
   * Array of categories for populating categories dropdown.
   * @type {Option[]}
   */
  public categories: Option[] = [];

  /**
   * Array of ingredient functions for populating functions dropdown.
   * @type {Option[]}
   */
  public ingredientFunctions: Option[] = [];

  /**
   * Array of boolean options for populating boolean dropdowns.
   * @type {Option[]}
   */
  public booleanOptions: Option[] = booleanOptions;

  /**
   * Ingredient model to be created or updated.
   * @type {Ingredient}
   */
  public ingredient: Ingredient = {
    ewgRisk: 0,
    comedogenIndex: 0,
    irritationIndex: 0,
    imageFile: '',
    functions: [] as Option[],
  } as Ingredient;

  /**
   * Page action for determining whether it's a create or update operation.
   * @type {PageAction}
   */
  public pageAction: PageAction = PageAction.Create;

  /**
   * Observable of ingredient to be updated.
   * @type {Observable<Ingredient> | null}
   */
  public ingredient$: Observable<Ingredient> | null = null;

  /**
   * Constructor of IngredientFormComponent.
   *
   * @param ingredientService - An instance of IngredientsService for managing ingredient data.
   * @param categoryService - An instance of CategoriesService for managing category data.
   * @param router - An instance of Router for navigating to different pages.
   * @param activatedRoute - An instance of ActivatedRoute for accessing route parameters.
   */
  constructor(
    private readonly ingredientService: IngredientsService,
    private readonly categoryService: CategoriesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    // Get the action parameter from the route
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;

    // If the page action is Create, fetch options and set default category
    if (this.pageAction === PageAction.Create) {
      this.fetchOptions().then(
        () => (this.ingredient.categories = [this.categories[0]])
      );
    }
    // If the page action is Update, fetch options and fetch ingredient by ID
    else if (this.pageAction === PageAction.Update) {
      const ingredientId: string | null =
        this.activatedRoute.snapshot.paramMap.get('ingredientId');
      if (ingredientId) {
        this.ingredient$ = this.ingredientService
          .fetchIngredientById(+ingredientId)
          .pipe(tap(() => this.fetchOptions()));
      }
    }
  }

  /**
   * Fetches categories and ingredient functions from their respective services.
   * Populates the categories and ingredientFunctions arrays with the fetched data.
   */
  private async fetchOptions() {
    this.categories = await firstValueFrom(
      this.categoryService.fetchCategories()
    );
    this.ingredientFunctions = await firstValueFrom(
      this.ingredientService.fetchIngredientFunctions()
    );
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Subscribes to the ingredient$ observable to update the ingredient data.
   */
  public ngOnInit(): void {
    this.ingredient$?.subscribe((ingredient: Ingredient) => {
      this.ingredient = ingredient;
    });
  }

  /**
   * Handles file drop event from NgxFileDrop directive.
   * @param file - Array of NgxFileDropEntry representing the dropped files.
   */
  public onFileDrop(file: NgxFileDropEntry[]): void {
    const droppedFile: NgxFileDropEntry = file[0];
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((droppedFile: File) => {
        Utils.validateAndGetFile(
          droppedFile,
          (event: ProgressEvent<FileReader>) => {
            const fileContent: string = event.target?.result as string;
            this.ingredient.imageFile = fileContent;
          }
        );
      });
    }
  }

  /**
   * Handles file upload event from file input element.
   * @param event - File upload event.
   */
  public onFileUpload(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const uploadedFile: File | null = inputElement.files
      ? inputElement.files[0]
      : null;
    if (uploadedFile) {
      Utils.validateAndGetFile(
        uploadedFile,
        (event: ProgressEvent<FileReader>) => {
          const fileContent: string = event.target?.result as string;
          this.ingredient.imageFile = fileContent;
        }
      );
    }
  }

  /**
   * Maps page action to title segment for display.
   * @param pageAction - Page action enum value.
   * @returns - Title segment string.
   */
  public mapPageActionToTitleSegment(pageAction: PageAction): string {
    return Utils.mapPageActionToTitleSegment(pageAction);
  }

  /**
   * Maps page action to submit button label segment for display.
   * @param pageAction - Page action enum value.
   * @returns - Submit button label segment string.
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
   * Handles form submit event.
   * Performs ingredient creation or update based on the page action.
   * Then it navigates to the details page of the created or updated ingredient
   * based on the ingredient id response from the backend
   */
  public onSubmit(): void {
    if (this.pageAction === PageAction.Create) {
      this.ingredientService
        .addNewIngredient(this.ingredient)
        .subscribe((ingredientId: number) => {
          this.router.navigate(['/ingredients/details', ingredientId]);
        });
    } else if (this.pageAction === PageAction.Update) {
      this.ingredientService
        .updateingredient(this.ingredient)
        .subscribe((ingredientId: number) => {
          this.router.navigate(['/ingredients/details', ingredientId]);
        });
    }
  }
}
