import { Component, OnInit } from '@angular/core';
import { combineLatest, first, map } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { PageAction } from '../../shared/enums';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../brands-service/brands.service';
import { Brand } from '../brand-model/brand.model';

/**
 * Component for displaying brands filtered by category.
 */
@Component({
  selector: 'app-brands-by-category',
  templateUrl: './brands-by-category.component.html',
  styleUrls: ['./brands-by-category.component.scss'],
})
export class BrandsByCategoryComponent implements OnInit {
  /**
   * The category object to display.
   */
  public category: Category = {} as Category;

  /**
   * The part of the category title to be displayed.
   */
  public categoryTitlePart: string = '';

  /**
   * The page action to be performed (e.g., create, update, read).
   */
  public pageAction: PageAction = PageAction.Read;

  /**
   * The list of brands to display.
   */
  public brandList: Brand[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService
  ) {}

  /**
   * Lifecycle hook called when the component is initialized.
   * Fetches the data and initializes component properties.
   */
  public ngOnInit(): void {
    combineLatest([
      this.activatedRoute.paramMap.pipe(
        first(),
        map(() => window.history.state)
      ),
      this.activatedRoute.paramMap,
    ]).subscribe(([routeData, paramMap]) => {
      this.pageAction = paramMap.get('action') as PageAction;
      this.category = {
        id: routeData.id,
        name: routeData.name,
        imagePath: '',
      };
      this.categoryTitlePart = this.getCategoryTitlePart(this.category);

      this.brandsService
        .fetchBrandsByCategory(this.category.id)
        .subscribe((brands: Brand[]) => (this.brandList = brands));
    });
  }

  /**
   * Gets the category title part based on category name.
   * @param category - The category object.
   * @returns The category title part.
   */
  public getCategoryTitlePart(category: Category): string {
    let categoryTitlePart: string = '';
    if (category.name?.endsWith('S')) {
      categoryTitlePart = `${category.name}I TERMÉKEKET`;
    } else if (category.name?.endsWith('K')) {
      categoryTitlePart = `${category.name}ET FORGALMAZÓ`;
    }
    return categoryTitlePart;
  }
}
