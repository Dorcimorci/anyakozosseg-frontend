import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { ProductListItem } from '../product-model/product.api';
import { ProductService } from '../product-service/product.service';

/**
 * Represents a component that displays products filtered by category.
 */
@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent {
  /**
   * Observable that holds the list of products to display.
   */
  public products$: Observable<ProductListItem[]>;

  /**
   * The category object to display in the component view.
   */
  public category: Category = {} as Category;

  /**
   * The category ID used for filtering products.
   */
  private categoryId: number;

  /**
   * Creates an instance of ProductsByCategoryComponent and initializes the class properties.
   * @param activatedRoute - The ActivatedRoute service, which provides access to the current route parameters.
   * @param productService - The ProductService service, which provides methods for fetching products.
   */
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService
  ) {
    this.categoryId = +this.activatedRoute.snapshot.paramMap.get('categoryId')!;
    this.activatedRoute.paramMap
      .pipe(
        first(), // Emit only the first value from paramMap
        map(() => window.history.state) // Map the paramMap to the state from window.history
      )
      .subscribe((routeData) => {
        this.category = {
          id: routeData.id,
          name: routeData.name,
          imagePath: '',
        };
      });
    this.products$ = this.productService.fetchProductsByCategory(
      this.categoryId
    );
  }

  /**
   * Gets the category title to display in the component view.
   * @param category - The category object to get the title from.
   * @returns The category title string.
   */
  public getCategoryTitle(category: Category): string {
    let categoryTitlePart: string = category.name;
    if (category.name?.endsWith('S')) {
      categoryTitlePart = `${category.name}I TERMÉKEK`;
    }
    return categoryTitlePart;
  }
}
