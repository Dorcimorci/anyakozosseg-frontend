import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../brand-model/brand.model';
import { Option } from '../../shared/single-select/option.model';
import { BASE_URL } from '../../shared/constants';

const COMPONENT_URL = 'brands';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches brands by category ID.
   * @param categoryId The ID of the category to filter brands.
   * @returns Observable of an array of Brand objects.
   */
  public fetchBrandsByCategory(categoryId: number): Observable<Brand[]> {
    const params: HttpParams = new HttpParams().set(
      'categoryId',
      categoryId.toString()
    );
    return this.http.get<Brand[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  /**
   * Fetches brands by ABC letter.
   * @param letter The ABC letter to filter brands.
   * @returns Observable of an array of Brand objects.
   */
  public fetchBrandsByLetter(letter: string): Observable<Brand[]> {
    const params: HttpParams = new HttpParams().set('abcLetter', letter);
    return this.http.get<Brand[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  /**
   * Fetches all brands.
   * @returns Observable of an array of Option objects.
   */
  public fetchAllBrands(): Observable<Option[]> {
    return this.http.get<Option[]>(`${BASE_URL}${COMPONENT_URL}`);
  }

  /**
   * Fetches a brand by brand ID.
   * @param brandId The ID of the brand to fetch.
   * @returns Observable of a Brand object.
   */
  public fetchBrandById(brandId: number): Observable<Brand> {
    const params: HttpParams = new HttpParams().set(
      'brandId',
      brandId.toString()
    );
    return this.http.get<Brand>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  /**
   * Adds a new brand.
   * @param brand The Brand object to add.
   * @returns Observable of type number representing the id of the newly added brand.
   */
  public addNewBrand(brand: Brand): Observable<number> {
    return this.http.post<number>(`${BASE_URL}${COMPONENT_URL}`, brand, {
      withCredentials: true,
    });
  }

  /**
   * Updates a brand.
   * @param brand The Brand object to update.
   * @returns Observable of type number representing the id of the edited brand.
   */
  public updateBrand(brand: Brand): Observable<number> {
    return this.http.put<number>(`${BASE_URL}${COMPONENT_URL}`, brand, {
      withCredentials: true,
    });
  }

  /**
   * Deletes a brand by brand ID.
   * @param brandId The ID of the brand to delete.
   * @returns Observable of type number representing the id of the deleted brand.
   */
  public deleteById(brandId: number): Observable<number> {
    const params: HttpParams = new HttpParams().set(
      'brandId',
      brandId.toString()
    );
    return this.http.delete<number>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
      withCredentials: true,
    });
  }
}
