import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../brand-model/brand.model';
import { Option } from '../../shared/dropdown/dropdown.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'brands';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}

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

  public fetchAllBrands(): Observable<Option[]> {
    return this.http.get<Option[]>(`${BASE_URL}${COMPONENT_URL}`);
  }

  public fetchBrandById(brandId: number): Observable<Brand> {
    const params: HttpParams = new HttpParams().set('brandId', brandId);
    return this.http.get<Brand>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public addNewBrand(brand: Brand): Observable<any> {
    return this.http.post<Brand>(`${BASE_URL}${COMPONENT_URL}`, brand, {
      withCredentials: true,
    });
  }

  public updateBrand(brand: Brand): Observable<any> {
    return this.http.put<Brand>(`${BASE_URL}${COMPONENT_URL}`, brand, {
      withCredentials: true,
    });
  }

  public deleteById(brandId: number): Observable<any> {
    const params: HttpParams = new HttpParams().set('brandId', brandId);
    return this.http.delete(`${BASE_URL}${COMPONENT_URL}`, {
      params,
      withCredentials: true,
    });
  }
}
