import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from '../../shared/single-select/option.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'price-categories';

@Injectable({
  providedIn: 'root',
})
export class PriceCategoryService {
  constructor(private http: HttpClient) {}

  public fetchPriceCategories(): Observable<Option[]> {
    return this.http.get<Option[]>(`${BASE_URL}${COMPONENT_URL}`);
  }
}
