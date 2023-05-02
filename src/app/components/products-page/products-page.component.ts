import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';
import { PageAction } from '../shared/enums';
import { RouterService } from '../shared/router.service';

/**
 * Represents a component that displays products page.
 */
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent {
  /**
   * Enum representing page actions.
   */
  public get PageAction(): typeof PageAction {
    return PageAction;
  }

  /**
   * Observable that holds the current page action.
   */
  public pageAction$: Observable<PageAction> = this.routerService.pageAction$;

  /**
   * Array of categories to display in the component view.
   */
  public categories: Category[] = [];

  /**
   * Creates an instance of ProductsPageComponent.
   * @param categoriesService - The CategoriesService service, which provides methods for fetching categories.
   * @param routerService - The RouterService service, which provides methods for handling router-related functionality.
   */
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly routerService: RouterService
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  public ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Fetches categories from the CategoriesService and sets them to the component property.
   */
  public getCategories(): void {
    this.categoriesService
      .fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
