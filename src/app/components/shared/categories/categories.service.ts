import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { BASE_URL } from '../constants';

const COMPONENT_URL = 'categories';

/**
 * Service for fetching categories from the backend API.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches categories from the backend API.
   * @returns {Observable<Category[]>} Observable that emits an array of Category objects.
   */
  public fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}${COMPONENT_URL}`, {
      withCredentials: true,
    });
  }
}
