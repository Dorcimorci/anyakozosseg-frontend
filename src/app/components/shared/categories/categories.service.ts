import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Option } from '../dropdown/dropdown.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}${COMPONENT_URL}`);
  }
}
