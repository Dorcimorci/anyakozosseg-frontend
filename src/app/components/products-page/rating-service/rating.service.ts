import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingPostRequest } from '../product-model/product.api';
import { BASE_URL } from '../../shared/constants';

const COMPONENT_URL = 'ratings';

/**
 * Service for managing ratings for products.
 */
@Injectable({
  providedIn: 'root',
})
export class RatingService {
  /**
   * Creates an instance of RatingService.
   * @param http - The HttpClient module for making HTTP requests.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Submits a new rating for a product.
   * @param rating - The rating to be submitted.
   * @returns An Observable that emits the response from the server.
   */
  public submitRating(rating: RatingPostRequest): Observable<string> {
    return this.http.post<string>(`${BASE_URL}${COMPONENT_URL}`, rating, {
      withCredentials: true,
    });
  }

  /**
   * Edits an existing rating for a product.
   * @param rating - The updated rating to be edited.
   * @returns An Observable that emits the response from the server.
   */
  public editRating(rating: RatingPostRequest): Observable<string> {
    return this.http.put<string>(`${BASE_URL}${COMPONENT_URL}`, rating, {
      withCredentials: true,
    });
  }
}
