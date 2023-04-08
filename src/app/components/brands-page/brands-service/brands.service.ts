import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand, MinimalBrand } from '../brand-model/brand.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'brands';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}

  public addNewBrand(brand: Brand): Observable<any> {
    return this.http.post<Brand>(`${BASE_URL}${COMPONENT_URL}`, brand);
  }

  public fetchBrandsByCategory(categoryId: number): Observable<Brand[]> {
    const params: HttpParams = new HttpParams().set('categoryId', categoryId);
    return this.http.get<Brand[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchBrandsByLetter(letter: string): Observable<Brand[]> {
    const params: HttpParams = new HttpParams().set('abcLetter', letter);
    return this.http.get<Brand[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchAllBrands(): Observable<MinimalBrand[]> {
    return this.http.get<MinimalBrand[]>(`${BASE_URL}${COMPONENT_URL}`);
  }

  public fetchBrandById(brandId: number): Observable<Brand> {
    const params: HttpParams = new HttpParams().set('brandId', brandId);
    return this.http.get<Brand>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public updateBrand(brand: Brand): Observable<any> {
    return this.http.put<Brand>(`${BASE_URL}${COMPONENT_URL}`, brand);
  }

  public deleteById(brandId: number): Observable<any> {
    const params: HttpParams = new HttpParams().set('brandId', brandId);
    return this.http.delete(`${BASE_URL}${COMPONENT_URL}`, { params });
  }
}
