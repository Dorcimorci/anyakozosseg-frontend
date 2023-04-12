import { Component, OnInit } from '@angular/core';
import { combineLatest, first, map } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { PageAction } from '../../shared/enums';
import { Utils } from '../../shared/utils';
import { ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { Ingredient } from '../ingredient-model/ingredient.model';

@Component({
  selector: 'app-ingredients-by-category',
  templateUrl: './ingredients-by-category.component.html',
  styleUrls: ['./ingredients-by-category.component.scss'],
})
export class IngredientsByCategoryComponent implements OnInit {
  public category: Category = {} as Category;
  public categoryTitle: string = '';
  public pageAction: PageAction = PageAction.Read;
  public ingredientList: Ingredient[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsService: IngredientsService
  ) {}

  public ngOnInit(): void {
    combineLatest([
      this.activatedRoute.paramMap.pipe(
        first(),
        map(() => window.history.state)
      ),
      this.activatedRoute.paramMap,
    ]).subscribe(([routeData, paramMap]) => {
      this.pageAction = paramMap.get('action') as PageAction;
      this.category = {
        id: routeData.id,
        name: routeData.name,
        imagePath: '',
      };
      this.categoryTitle = this.getCategoryTitle(this.category);

      this.ingredientsService
        .fetchIngredientsByCategory(this.category.id)
        .subscribe(
          (ingredients: Ingredient[]) => (this.ingredientList = ingredients)
        );
    });
  }

  public getCategoryTitle(category: Category): string {
    let categoryTitlePart: string = '';
    if (category.name?.endsWith('S')) {
      categoryTitlePart = `${category.name}I ÖSSZETEVŐK`;
    } else {
      categoryTitlePart = `${category.name} ÖSSZETEVŐI`;
    }
    return categoryTitlePart;
  }

  public removeAccents(textWithAccents: string): string {
    return Utils.removeAccents(textWithAccents);
  }
}
