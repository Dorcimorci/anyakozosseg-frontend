import { Component } from '@angular/core';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';

/**
 * Represents the Ingredients Page component that displays the categories for ingredients.
 */
@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss'],
})
export class IngredientsPageComponent {
  /**
   * Array of categories fetched from the CategoriesService.
   */
  public categories: Category[] = [];

  /**
   * Creates an instance of IngredientsPageComponent.
   *
   * @param categoriesService - The CategoriesService to fetch categories from.
   */
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Lifecycle hook that is called after component initialization.
   * Fetches the categories from the CategoriesService and updates the categories property.
   */
  public ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Fetches the categories from the CategoriesService and updates the categories property.
   */
  public getCategories(): void {
    this.categoriesService
      .fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
