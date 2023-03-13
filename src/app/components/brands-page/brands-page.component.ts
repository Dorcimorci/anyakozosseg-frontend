import { Component } from '@angular/core';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';

@Component({
  selector: 'app-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrls: ['./brands-page.component.scss'],
})
export class BrandsPageComponent {
  public categories: Category[];

  constructor(public categoriesService: CategoriesService) {}

  public ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
