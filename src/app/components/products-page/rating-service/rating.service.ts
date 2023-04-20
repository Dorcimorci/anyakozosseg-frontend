import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingPostRequest } from '../product-model/product.api';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'ratings';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private readonly http: HttpClient) {}

  public submitRating(rating: RatingPostRequest): Observable<any> {
    return this.http.post<RatingPostRequest>(
      `${BASE_URL}${COMPONENT_URL}`,
      rating,
      { withCredentials: true }
    );
  }

  public editRating(rating: RatingPostRequest): Observable<any> {
    return this.http.put<RatingPostRequest>(
      `${BASE_URL}${COMPONENT_URL}`,
      rating,
      { withCredentials: true }
    );
  }
}
