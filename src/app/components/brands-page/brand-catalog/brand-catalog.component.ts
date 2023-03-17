import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, first, map } from 'rxjs';
import { Category } from '../../shared/categories/category.model';
import { PageAction } from '../../shared/enums';
import { alphabetLetters, Utils } from '../../shared/utils';
import { BrandApiGetResponse } from '../brand-model/brand.api';
import { BrandsService } from '../brands-service/brands.service';

@Component({
  selector: 'app-alphabetical-brand-catalog',
  templateUrl: './brand-catalog.component.html',
  styleUrls: ['./brand-catalog.component.scss'],
})
export class BrandCatalogComponent implements OnInit {
  public category: Category = {} as Category;
  public categoryTitlePart: string = '';
  public alphabetLetters: string[] = alphabetLetters;
  public activeLetter: string | null = null;

  public pageAction: PageAction = PageAction.Read;
  public get PageAction() {
    return PageAction;
  }

  public brandList: BrandApiGetResponse[] = [];

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
      this.activeLetter = paramMap.get('abcLetter');
      this.pageAction = paramMap.get('action') as PageAction;
      this.category = {
        id: routeData.id,
        name: routeData.name,
        imagePath: '',
      };
      this.setCategoryTitlePart(this.category);

      this.brandsService
        .fetchBrands(this.category.id, this.activeLetter)
        .subscribe(
          (brands: BrandApiGetResponse[]) => (this.brandList = brands)
        );
    });
  }

  public setCategoryTitlePart(category: Category): void {
    if (category.name?.endsWith('S')) {
      this.categoryTitlePart = `${category.name}I TERMÉKEKET`;
    } else if (category.name?.endsWith('K')) {
      this.categoryTitlePart = `${category.name}ET FORGALMAZÓ`;
    }
  }

  public onDelete(brandId: number): void {
    this.brandsService.deleteById(brandId).subscribe(() => {
      this.ngOnInit();
    });
  }

  public removeAccents(textWithAccents: string): string {
    return Utils.removeAccents(textWithAccents);
  }
}
