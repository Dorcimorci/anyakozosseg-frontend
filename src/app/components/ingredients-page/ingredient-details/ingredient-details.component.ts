import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { Option } from '../../shared/dropdown/dropdown.model';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss'],
})
export class IngredientDetailsComponent {
  public ingredient$: Observable<Ingredient> | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly ingredientsService: IngredientsService
  ) {
    this.ingredient$ = this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('ingredientId')),
      switchMap(
        (ingredientId: string | null) =>
          (this.ingredient$ = this.ingredientsService
            .fetchIngredientById(Number(ingredientId))
            .pipe(map((ingredient: Ingredient) => ingredient)))
      )
    );
  }

  public getFunctionNames(ingredient: Ingredient): string {
    return ingredient.functions
      .map((singleFunction: Option) => singleFunction.name.toUpperCase())
      .join(', ');
  }

  public showDummyImage(event: ErrorEvent): void {
    (event.target as HTMLImageElement).src =
      'assets/img/ingredients/card_ingredient.jpg';
  }
}
