import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandApiGetResponse } from './brand.api';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'brands.php';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}

  public fetchBrands(
    categoryId: number,
    letter: string | null
  ): Observable<BrandApiGetResponse[]> {
    return this.http.get<BrandApiGetResponse[]>(
      `${BASE_URL}${COMPONENT_URL}?categoryId=${categoryId}&abcLetter=${letter}`
    );
  }

  public fetchBrandById(brandId: number): Observable<BrandApiGetResponse> {
    return this.http.get<BrandApiGetResponse>(
      `${BASE_URL}${COMPONENT_URL}?brandId=${brandId}`
    );
  }
}
