import { Component } from '@angular/core';
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

  /**
   * Represents the brand details component that displays the details of a specific brand.
   * @constructor
   * @param {ActivatedRoute} activatedRoute - The Angular router activated route service.
   * @param {BrandsService} brandsService - The service for fetching brand data.
   */
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly brandsService: BrandsService
  ) {
    /**
     * Fetches the brand details based on the 'brandId' parameter from the URL
     * and maps the boolean options using a utility function from shared/utils.
     * @param {ParamMap} params - The parameter map from the activated route.
     * @returns {Observable<Brand>} - An Observable that emits the details of a specific brand.
     */
    this.brand$ = this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('brandId')), // Extracts 'brandId' from the URL parameters
      switchMap(
        (brandId: string | null) =>
          this.brandsService
            .fetchBrandById(Number(brandId)) // Fetches the brand details from the service by brandId
            .pipe(map((brand: Brand) => Utils.mapBrandBooleanOptions(brand))) // Maps the boolean options using a utility function
      )
    );
  }
}
