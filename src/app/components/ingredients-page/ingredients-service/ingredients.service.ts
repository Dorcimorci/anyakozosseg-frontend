import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { Option } from '../../shared/single-select/option.model';
import { BASE_URL } from '../../shared/constants';

const COMPONENT_URL = 'ingredients';
const INGREDIENT_FUNCTIONS_URL = 'ingredient-functions';

/**
 * Represents a service for managing ingredients.
 */
@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  /**
   * Creates an instance of IngredientsService.
   *
   * @param http - The HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches ingredients by category ID from the backend server.
   *
   * @param categoryId - The ID of the category for which ingredients are to be fetched.
   * @returns An Observable that emits an array of Ingredient objects that belong to the specified category.
   */
  public fetchIngredientsByCategory(
    categoryId: number
  ): Observable<Ingredient[]> {
    const params: HttpParams = new HttpParams().set('categoryId', categoryId);
    return this.http.get<Ingredient[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  /**
   * Fetches ingredients by starting letter from the backend server.
   *
   * @param letter - The starting letter for filtering ingredients.
   * @returns An Observable that emits an array of Ingredient objects whose names start with the specified letter.
   */
  public fetchIngredientsByLetter(letter: string): Observable<Ingredient[]> {
    const params: HttpParams = new HttpParams().set('abcLetter', letter);
    return this.http.get<Ingredient[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  /**
   * Fetches all ingredients from the backend server.
   *
   * @returns An Observable that emits an array of Option objects representing all ingredients.
   */
  public fetchAllingredients(): Observable<Option[]> {
    return this.http.get<Option[]>(`${BASE_URL}${COMPONENT_URL}`);
  }

  /**
   * Fetches ingredient functions from the backend server.
   *
   * @returns An Observable that emits an array of Option objects representing ingredient functions.
   */
  public fetchIngredientFunctions(): Observable<Option[]> {
    return this.http.get<Option[]>(`${BASE_URL}${INGREDIENT_FUNCTIONS_URL}`);
  }

  /**
   * Fetches an ingredient by ID from the backend server.
   *
   * @param ingredientId - The ID of the ingredient to be fetched.
   * @returns An Observable that emits the Ingredient object with the specified ID.
   */
  public fetchIngredientById(ingredientId: number): Observable<Ingredient> {
    const params: HttpParams = new HttpParams().set(
      'ingredientId',
      ingredientId
    );
    return this.http.get<Ingredient>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  /**
   * Adds a new ingredient to the backend server.
   *
   * @param ingredient - The Ingredient object representing the ingredient to be added.
   * @returns An Observable that emits the generated ID of the newly added ingredient.
   */
  public addNewIngredient(ingredient: Ingredient): Observable<number> {
    return this.http.post<number>(`${BASE_URL}${COMPONENT_URL}`, ingredient, {
      withCredentials: true,
    });
  }

  /**
   * Updates an ingredient on the backend server.
   *
   * @param ingredient - The Ingredient object representing the updated ingredient.
   * @returns An Observable that emits the ID of the updated ingredient.
   */
  public updateingredient(ingredient: Ingredient): Observable<number> {
    return this.http.put<number>(`${BASE_URL}${COMPONENT_URL}`, ingredient, {
      withCredentials: true,
    });
  }

  /**
   * Deletes an ingredient by ID from the backend.
   * @param ingredientId The ID of the ingredient to be deleted.
   * @returns An Observable that emits the ID of the deleted ingredient as a number.
   */
  public deleteById(ingredientId: number): Observable<number> {
    const params: HttpParams = new HttpParams().set(
      'ingredientId',
      ingredientId.toString()
    );
    return this.http.delete<number>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
      withCredentials: true,
    });
  }
}
