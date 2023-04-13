import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../shared/categories/categories.service';
import { Category } from '../shared/categories/category.model';
import { PageAction } from '../shared/enums';
import { RouterService } from '../shared/router.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrls: ['./brands-page.component.scss'],
})
export class BrandsPageComponent {
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

  public removeAccents(textWithAccents: string): string {
    return Utils.removeAccents(textWithAccents);
  }
}
