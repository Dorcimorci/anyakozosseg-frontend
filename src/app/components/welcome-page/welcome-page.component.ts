import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';

/**
 * Component for the welcome page of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Array of categories to display
   */
  public categories: Category[] = [];

  /**
   * Creates an instance of WelcomePageComponent.
   * @param categoriesService - The CategoriesService for fetching categories.
   */
  constructor(public categoriesService: CategoriesService) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * Fetches the categories from the CategoriesService.
   */
  public ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Fetches the categories from the CategoriesService.
   */
  public getCategories(): void {
    this.categoriesService
      .fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
