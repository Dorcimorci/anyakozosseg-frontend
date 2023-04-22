import { Component } from '@angular/core';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';
import { RouterService } from '../shared/router.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss'],
})
export class IngredientsPageComponent {
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
