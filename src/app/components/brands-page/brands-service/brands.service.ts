import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BrandApiGetResponse,
  BrandApiPostRequest,
} from '../brand-model/brand.api';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'brands';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}

  public addNewBrand(brand: BrandApiPostRequest): Observable<any> {
    return this.http.post<BrandApiPostRequest>(
      `${BASE_URL}${COMPONENT_URL}`,
      brand
    );
  }

  public fetchBrands(
    categoryId: number,
    letter: string
  ): Observable<BrandApiGetResponse[]> {
    const params: HttpParams = new HttpParams()
      .set('categoryId', categoryId)
      .set('abcLetter', letter);
    return this.http.get<BrandApiGetResponse[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchBrandById(brandId: number): Observable<BrandApiGetResponse> {
    const params: HttpParams = new HttpParams().set('brandId', brandId);
    return this.http.get<BrandApiGetResponse>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public updateBrand(brand: BrandApiPostRequest): Observable<any> {
    return this.http.put<BrandApiPostRequest>(
      `${BASE_URL}${COMPONENT_URL}`,
      brand
    );
  }

  public deleteById(brandId: number): Observable<any> {
    const params: HttpParams = new HttpParams().set('brandId', brandId);
    return this.http.delete(`${BASE_URL}${COMPONENT_URL}`, { params });
  }
}
