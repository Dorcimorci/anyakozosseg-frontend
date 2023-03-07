import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';

const BASE_URL = 'http://localhost:3000/API/';
const COMPONENT_URL = 'categories.php';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}${COMPONENT_URL}`);
  }
}
