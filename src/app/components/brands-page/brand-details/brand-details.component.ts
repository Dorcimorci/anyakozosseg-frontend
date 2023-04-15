import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
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
    this.brand$ = this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('brandId')),
      switchMap((brandId: string | null) =>
        this.brandsService
          .fetchBrandById(Number(brandId))
          .pipe(map((brand: Brand) => Utils.mapBrandBooleanOptions(brand)))
      )
    );
  }
}
