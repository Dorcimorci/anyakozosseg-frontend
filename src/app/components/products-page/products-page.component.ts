import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';
import { PageAction } from '../shared/enums';
import { RouterService } from '../shared/router.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent {
  public get PageAction() {
    return PageAction;
  }

  public pageAction$: Observable<PageAction> = this.routerService.pageAction$;
  public categories: Category[] = [];

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly routerService: RouterService
  ) {}

  public ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.categoriesService
      .fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
