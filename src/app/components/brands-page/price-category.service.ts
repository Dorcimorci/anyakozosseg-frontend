import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceCategoryOption } from '../shared/enums';
import { PriceCategory } from './price-category.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'price-categories.php';

@Injectable({
  providedIn: 'root',
})
export class PriceCategoryService {
  constructor(private http: HttpClient) {}

  public fetchPriceCategories(): Observable<PriceCategory[]> {
    return this.http.get<PriceCategory[]>(`${BASE_URL}${COMPONENT_URL}`);
  }
}
