import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { ProductListItem } from '../product-model/product.api';
import { ProductService } from '../product-service/product.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent {
  public products$: Observable<ProductListItem[]>;
  public category: Category = {} as Category;

  private categoryId: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService
  ) {
    this.categoryId = +this.activatedRoute.snapshot.paramMap.get('categoryId')!;
    this.activatedRoute.paramMap
      .pipe(
        first(),
        map(() => window.history.state)
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

  public getCategoryTitle(category: Category): string {
    let categoryTitlePart: string = category.name;
    if (category.name?.endsWith('S')) {
      categoryTitlePart = `${category.name}I TERMÉKEK`;
    }
    return categoryTitlePart;
  }
}
