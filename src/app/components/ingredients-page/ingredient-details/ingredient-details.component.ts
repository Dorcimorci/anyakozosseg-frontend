/**
 * Component for displaying details of an ingredient.
 */
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { Option } from '../../shared/single-select/option.model';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss'],
})
export class IngredientDetailsComponent {
  public ingredient$: Observable<Ingredient> | null = null;

  /**
   * Constructor for IngredientDetailsComponent.
   *
   * @param activatedRoute - The ActivatedRoute to retrieve route parameters.
   * @param ingredientsService - The IngredientsService for fetching ingredient details.
   */
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly ingredientsService: IngredientsService
  ) {
    // Fetches ingredient details based on ingredientId from route parameters
    this.ingredient$ = this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('ingredientId')),
      switchMap((ingredientId: string | null) =>
        this.ingredientsService.fetchIngredientById(Number(ingredientId))
      )
    );
  }

  /**
   * Returns the concatenated function names of an ingredient, separated by commas.
   *
   * @param ingredient - The Ingredient object to retrieve function names from.
   * @returns The concatenated function names.
   */
  public getFunctionNames(ingredient: Ingredient): string {
    return ingredient.functions
      .map((singleFunction: Option) => singleFunction.name.toUpperCase())
      .join(', ');
  }

  /**
   * Handles error event when loading image fails and sets a dummy image source.
   *
   * @param event - The error event that occurred when loading the image.
   */
  public showDummyImage(event: ErrorEvent): void {
    (event.target as HTMLImageElement).src =
      'assets/img/ingredients/card_ingredient.jpg';
  }
}
