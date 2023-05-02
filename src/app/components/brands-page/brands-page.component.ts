import { Component } from '@angular/core';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';

/**
 * Represents the BrandsPageComponent which is responsible for displaying the brands page.
 */
@Component({
  selector: 'app-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrls: ['./brands-page.component.scss'],
})
export class BrandsPageComponent {
  /**
   * Holds the array of categories to be displayed on the brands page.
   */
  public categories: Category[] = [];

  /**
   * Constructs a new instance of the BrandsPageComponent.
   * @param categoriesService The service used to fetch categories.
   */
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * Invokes the getCategories() method to fetch and update the categories.
   */
  public ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Fetches the categories using the categoriesService and updates the categories array.
   */
  public getCategories(): void {
    this.categoriesService
      .fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
