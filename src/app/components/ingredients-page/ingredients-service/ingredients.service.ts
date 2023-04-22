import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { Option } from '../../shared/single-select/option.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'ingredients';
const INGREDIENT_FUNCTIONS_URL = 'ingredient-functions';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private http: HttpClient) {}

  public addNewIngredient(ingredient: Ingredient): Observable<any> {
    return this.http.post<Ingredient>(
      `${BASE_URL}${COMPONENT_URL}`,
      ingredient
    );
  }

  public fetchIngredientsByCategory(
    categoryId: number
  ): Observable<Ingredient[]> {
    const params: HttpParams = new HttpParams().set('categoryId', categoryId);
    return this.http.get<Ingredient[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchIngredientsByLetter(letter: string): Observable<Ingredient[]> {
    const params: HttpParams = new HttpParams().set('abcLetter', letter);
    return this.http.get<Ingredient[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchAllingredients(): Observable<Option[]> {
    return this.http.get<Option[]>(`${BASE_URL}${COMPONENT_URL}`);
  }

  public fetchIngredientFunctions(): Observable<Option[]> {
    return this.http.get<Option[]>(`${BASE_URL}${INGREDIENT_FUNCTIONS_URL}`);
  }

  public fetchIngredientById(ingredientId: number): Observable<Ingredient> {
    const params: HttpParams = new HttpParams().set(
      'ingredientId',
      ingredientId
    );
    return this.http.get<Ingredient>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public updateingredient(ingredient: Ingredient): Observable<any> {
    return this.http.put<Ingredient>(`${BASE_URL}${COMPONENT_URL}`, ingredient);
  }

  public deleteById(ingredientId: number): Observable<any> {
    const params: HttpParams = new HttpParams().set(
      'ingredientId',
      ingredientId
    );
    return this.http.delete(`${BASE_URL}${COMPONENT_URL}`, { params });
  }
}
