import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PageAction } from '../../shared/enums';
import { alphabetLetters } from '../../shared/utils';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { switchMap } from 'rxjs';

/**
 * Represents the AlphabeticalIngredientCatalogComponent which is responsible for displaying an alphabetical catalog of ingredients.
 */
@Component({
  selector: 'app-alphabetical-ingredient-catalog',
  templateUrl: './ingredient-catalog.component.html',
  styleUrls: ['./ingredient-catalog.component.scss'],
})
export class IngredientCatalogComponent implements OnInit {
  /**
   * An array of alphabet letters to be displayed in the catalog.
   */
  public alphabetLetters: string[] = alphabetLetters;

  /**
   * The currently active alphabet letter.
   */
  public activeLetter: string = 'a';

  /**
   * The page action for the catalog (e.g. Read, Update, Delete).
   */
  public pageAction: PageAction = PageAction.Read;

  /**
   * Getter for the PageAction enum, used in template for referencing enum values.
   */
  public get PageAction() {
    return PageAction;
  }

  /**
   * The list of ingredients to be displayed in the catalog.
   */
  public ingredientList: Ingredient[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsService: IngredientsService
  ) {}

  /**
   * Angular lifecycle hook that is called when the component is initialized.
   * Fetches ingredients based on the active alphabet letter and updates the ingredient list.
   */
  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          this.activeLetter = paramMap.get('abcLetter') ?? this.activeLetter;
          this.pageAction = paramMap.get('action') as PageAction;
          return this.ingredientsService.fetchIngredientsByLetter(
            this.activeLetter
          );
        })
      )
      .subscribe(
        (ingredients: Ingredient[]) => (this.ingredientList = ingredients)
      );
  }

  /**
   * Event handler for deleting an ingredient.
   * Calls the deleteById() method in the IngredientsService and triggers a component reinitialization.
   * @param ingredientId - The ID of the ingredient to be deleted.
   */
  public onDelete = (ingredientId: number): void => {
    this.ingredientsService.deleteById(ingredientId).subscribe(() => {
      this.ngOnInit();
    });
  };
}
