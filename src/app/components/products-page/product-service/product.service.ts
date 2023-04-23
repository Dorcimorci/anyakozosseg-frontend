import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListItem } from '../product-model/product.api';
import { Product } from '../product-model/product.model';
import { Option } from '../../shared/single-select/option.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'products';
const SUBCATEGORIES_URL = 'subcategories';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public fetchProductsByCategory(
    categoryId: number
  ): Observable<ProductListItem[]> {
    const params: HttpParams = new HttpParams().set('categoryId', categoryId);
    return this.http.get<ProductListItem[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchProductsByFirstLetter(
    firstLetter: string
  ): Observable<ProductListItem[]> {
    const params: HttpParams = new HttpParams().set('abcLetter', firstLetter);
    return this.http.get<ProductListItem[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchProductDetailsById(id: number): Observable<Product> {
    const params: HttpParams = new HttpParams().set('productId', id);
    return this.http.get<Product>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
      withCredentials: true,
    });
  }

  public fetchSubcategories(categoryId: number): Observable<Option[]> {
    const params: HttpParams = new HttpParams().set('categoryId', categoryId);
    return this.http.get<Option[]>(`${BASE_URL}${SUBCATEGORIES_URL}`, {
      params,
    });
  }

  public addNewProduct(product: Product): Observable<any> {
    return this.http.post(`${BASE_URL}${COMPONENT_URL}`, product, {
      withCredentials: true,
    });
  }

  public updateProduct(product: Product): Observable<any> {
    return this.http.put(`${BASE_URL}${COMPONENT_URL}`, product, {
      withCredentials: true,
    });
  }

  public deleteProduct(productId: number): Observable<any> {
    const params: HttpParams = new HttpParams().set('productId', productId);
    return this.http.delete(`${BASE_URL}${COMPONENT_URL}`, {
      params,
      withCredentials: true,
    });
  }
}
