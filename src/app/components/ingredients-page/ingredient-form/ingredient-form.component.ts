import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { combineLatest, firstValueFrom, map, Observable, tap } from 'rxjs';
import { CategoriesService } from '../../shared/categories/categories.service';
import { PageAction } from '../../shared/enums';
import { booleanOptions, Utils } from '../../shared/utils';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { Option } from '../../shared/dropdown/dropdown.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss'],
})
export class IngredientFormComponent implements OnInit {
  public readonly categoriesDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
  };

  public readonly functionsDropdownSettings: IDropdownSettings = {
    ...this.categoriesDropdownSettings,
    allowSearchFilter: true,
    singleSelection: false,
    searchPlaceholderText: 'Keresés',
  };

  public categories: Option[] = [];
  public ingredientFunctions: Option[] = [];
  public booleanOptions: Option[] = booleanOptions;

  public ingredient: Ingredient = {
    ewgRisk: 0,
    comedogenIndex: 0,
    irritationIndex: 0,
    imageFile: '',
    functions: [] as Option[],
  } as Ingredient;

  public pageAction: PageAction = PageAction.Create;
  public ingredient$: Observable<Ingredient> | null = null;

  constructor(
    private readonly ingredientService: IngredientsService,
    private readonly categoryService: CategoriesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.pageAction = this.activatedRoute.snapshot.paramMap.get(
      'action'
    ) as PageAction;

    if (this.pageAction === PageAction.Create) {
      this.fetchOptions().then(
        () => (this.ingredient.categories = [this.categories[0]])
      );
    } else if (this.pageAction === PageAction.Update) {
      const ingredientId: string | null =
        this.activatedRoute.snapshot.paramMap.get('ingredientId');
      if (ingredientId) {
        this.ingredient$ = this.ingredientService
          .fetchIngredientById(+ingredientId)
          .pipe(tap(() => this.fetchOptions()));
      }
    }
  }

  private async fetchOptions() {
    this.categories = await firstValueFrom(
      this.categoryService.fetchCategories()
    );
    this.ingredientFunctions = await firstValueFrom(
      this.ingredientService.fetchIngredientFunctions()
    );
  }

  public ngOnInit(): void {
    this.ingredient$?.subscribe((ingredient: Ingredient) => {
      this.ingredient = ingredient;
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
            this.ingredient.imageFile = fileContent;
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
          this.ingredient.imageFile = fileContent;
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
      this.ingredientService
        .addNewIngredient(this.ingredient)
        .subscribe((response: { ingredientId: number }) => {
          this.router.navigate(['/ingredients/details', response.ingredientId]);
        });
    } else if (this.pageAction === PageAction.Update) {
      this.ingredientService
        .updateingredient(this.ingredient)
        .subscribe((response: { ingredientId: number }) => {
          this.router.navigate(['/ingredients/details', response.ingredientId]);
        });
    }
  }
}
