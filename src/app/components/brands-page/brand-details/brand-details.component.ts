import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Utils } from '../../shared/utils';
import { BrandApiGetResponse } from '../brand.api';
import { Brand } from '../brand.model';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss'],
})
export class BrandDetailsComponent {
  public brand$: Observable<Brand> | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly brandsService: BrandsService
  ) {
    const brandId: string | null =
      this.activatedRoute.snapshot.paramMap.get('brandId');
    if (brandId) {
      this.brand$ = this.brandsService.fetchBrandById(+brandId).pipe(
        map((brand: BrandApiGetResponse) => ({
          id: brand.id,
          isCrueltyFree: Utils.mapBoolToHun(brand.isCrueltyFree),
          isVegan: Utils.mapBoolToHun(brand.isCrueltyFree),
          name: brand.name,
          overallRating: brand.overallRating,
          priceCategory: brand.priceCategory,
          imagePath: brand.imagePath,
        }))
      );
    }
  }

  public getRatingStars(rating: number): string {
    let ratingStars: string = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        ratingStars += "<i class='fa-solid fa-star'></i>";
      } else {
        ratingStars += "<i class='fa-regular fa-star'></i>";
      }
    }
    return ratingStars;
  }
}
