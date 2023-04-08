import { Component, OnInit } from '@angular/core';
import { combineLatest, first, map } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { PageAction } from '../../shared/enums';
import { Utils } from '../../shared/utils';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../brands-service/brands.service';
import { Brand } from '../brand-model/brand.model';

@Component({
  selector: 'app-brands-by-category',
  templateUrl: './brands-by-category.component.html',
  styleUrls: ['./brands-by-category.component.scss'],
})
export class BrandsByCategoryComponent implements OnInit {
  public category: Category = {} as Category;
  public categoryTitlePart: string = '';
  public pageAction: PageAction = PageAction.Read;
  public brandList: Brand[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService
  ) {}

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

  public getCategoryTitlePart(category: Category): string {
    let categoryTitlePart: string = '';
    if (category.name?.endsWith('S')) {
      categoryTitlePart = `${category.name}I TERMÉKEKET`;
    } else if (category.name?.endsWith('K')) {
      categoryTitlePart = `${category.name}ET FORGALMAZÓ`;
    }
    return categoryTitlePart;
  }

  public removeAccents(textWithAccents: string): string {
    return Utils.removeAccents(textWithAccents);
  }
}
