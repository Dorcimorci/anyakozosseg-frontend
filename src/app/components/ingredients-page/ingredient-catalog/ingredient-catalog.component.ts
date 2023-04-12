import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PageAction } from '../../shared/enums';
import { alphabetLetters } from '../../shared/utils';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-alphabetical-ingredient-catalog',
  templateUrl: './ingredient-catalog.component.html',
  styleUrls: ['./ingredient-catalog.component.scss'],
})
export class IngredientCatalogComponent implements OnInit {
  public alphabetLetters: string[] = alphabetLetters;
  public activeLetter: string = 'a';

  public pageAction: PageAction = PageAction.Read;

  public get PageAction() {
    return PageAction;
  }

  public ingredientList: Ingredient[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsService: IngredientsService
  ) {}

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

  public onDelete = (ingredientId: number): void => {
    this.ingredientsService.deleteById(ingredientId).subscribe(() => {
      this.ngOnInit();
    });
  };
}
