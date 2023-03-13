import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Utils } from '../../shared/utils';
import { BrandApiGetResponse } from '../brand.api';
import { Brand } from '../brand.model';
import { BrandsService } from '../brands.service';
import { PriceCategory } from '../price-category.model';
import { PriceCategoryService } from '../price-category.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss'],
})
export class BrandDetailsComponent {
  public brand$: Observable<Brand> | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly brandsService: BrandsService,
    private readonly priceCategoryService: PriceCategoryService
  ) {
    const brandId: string =
      this.activatedRoute.snapshot.paramMap.get('brandId');
    if (brandId) {
      this.brand$ = combineLatest([
        this.brandsService.fetchBrandById(+brandId),
        this.priceCategoryService.fetchPriceCategories(),
      ]).pipe(
        map(([brand, priceCategories]) => ({
          id: brand.id,
          isCrueltyFree: Utils.mapBooleanToText(brand.isCrueltyFree),
          isVegan: Utils.mapBooleanToText(brand.isCrueltyFree),
          name: brand.name,
          overallRating: brand.overallRating,
          priceCategory: priceCategories.find(
            (priceCategory: PriceCategory) =>
              priceCategory.id === brand.priceCategoryId
          )!.priceCategoryName,
          imageFile: brand.imageFile,
          category: '',
        }))
      );
    }
  }
}
