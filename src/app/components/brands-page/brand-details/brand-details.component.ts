import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Brand } from '../brand-model/brand.model';
import { BrandsService } from '../brands-service/brands.service';
import { Utils } from '../../shared/utils';

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
      this.brand$ = this.brandsService
        .fetchBrandById(+brandId)
        .pipe(map((brand: Brand) => Utils.mapBrandBooleanOptions(brand)));
    }
  }
}
