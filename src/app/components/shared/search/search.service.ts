import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from './search.model';
import { BASE_URL } from '../constants';

const COMPONENT_URL = 'search';

/**
 * Service for handling search functionality.
 * It communicates with the backend API to perform searches and retrieve search results.
 * @Injectable: This service is provided at the root level, making it available for injection throughout the application.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  /**
   * Performs a search with the given query string and retrieves search results.
   * @param query - The query string to search for.
   * @returns An Observable that emits an array of SearchResult objects.
   */
  search(query: string): Observable<SearchResult[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<SearchResult[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }
}
