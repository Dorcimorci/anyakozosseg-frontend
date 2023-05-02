import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from '../../shared/single-select/option.model';
import { BASE_URL } from '../../shared/constants';

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
