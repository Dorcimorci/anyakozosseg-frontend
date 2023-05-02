import { Component, OnInit } from '@angular/core';
import { combineLatest, first, map } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { PageAction } from '../../shared/enums';
import { ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../ingredients-service/ingredients.service';
import { Ingredient } from '../ingredient-model/ingredient.model';

/**
 * Represents the component for displaying ingredients by category.
 */
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

  /**
   * Constructs an instance of IngredientsByCategoryComponent.
   * @param activatedRoute - The ActivatedRoute for getting route parameters.
   * @param ingredientsService - The IngredientsService for fetching ingredient data.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsService: IngredientsService
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   */
  public ngOnInit(): void {
    // Combine the observables from ActivatedRoute.paramMap and window.history.state
    // using the `combineLatest()` operator from RxJS.
    combineLatest([
      this.activatedRoute.paramMap.pipe(
        first(), // Take only the first emission
        map(() => window.history.state) // Map to window.history.state
      ),
      this.activatedRoute.paramMap, // Get the paramMap from ActivatedRoute
    ]).subscribe(([routeData, paramMap]) => {
      // Extract the data from routeData and paramMap
      this.pageAction = paramMap.get('action') as PageAction;
      this.category = {
        id: routeData.id,
        name: routeData.name,
        imagePath: '',
      };
      this.categoryTitle = this.getCategoryTitle(this.category);

      // Fetch ingredients by category from the IngredientsService
      this.ingredientsService
        .fetchIngredientsByCategory(this.category.id)
        .subscribe(
          (ingredients: Ingredient[]) => (this.ingredientList = ingredients)
        );
    });
  }

  /**
   * Gets the category title to be displayed in the component view.
   * @param category - The Category object for which to get the title.
   * @returns The category title string.
   */
  public getCategoryTitle(category: Category): string {
    let categoryTitlePart: string = '';
    if (category.name?.endsWith('S')) {
      categoryTitlePart = `${category.name}I ÖSSZETEVŐK`;
    } else {
      categoryTitlePart = `${category.name} ÖSSZETEVŐI`;
    }
    return categoryTitlePart;
  }
}
