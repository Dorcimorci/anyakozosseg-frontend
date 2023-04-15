import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from './search.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResult[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<SearchResult[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }
}
