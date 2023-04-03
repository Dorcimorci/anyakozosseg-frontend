import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Utils } from '../../shared/utils';
import { Brand } from '../brand-model/brand.model';
import { BrandsService } from '../brands-service/brands.service';
import { PriceCategory } from '../price-category/price-category.model';
import { PriceCategoryService } from '../price-category/price-category.service';

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
    const brandId: string | null =
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
          numberOfRatings: brand.numberOfRatings,
          priceCategory: priceCategories.find(
            (priceCategory: PriceCategory) =>
              priceCategory.id === brand.priceCategoryId
          )!.name,
          imageFile: brand.imageFile,
          category: '',
        }))
      );
    }
  }
}
