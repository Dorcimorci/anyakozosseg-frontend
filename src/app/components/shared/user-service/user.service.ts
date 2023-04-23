import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../user-model/user.model';
import { CookieService } from 'ngx-cookie-service';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'users';

/**
 * Service for managing user authentication and registration.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedInUser$: Subject<User> = new Subject<User>();

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  /**
   * Sends a login request to the backend with the given user credentials.
   * @param user The user object containing the login credentials.
   * @returns An Observable that emits the logged-in user as a User object.
   */
  public login(user: User): Observable<User> {
    const params: HttpParams = new HttpParams().set('login', '');
    return this.http.post<User>(`${BASE_URL}${COMPONENT_URL}`, user, {
      params,
      withCredentials: true,
    });
  }

  /**
   * Sends a registration request to the backend with the given user data.
   * @param user The user object containing the registration data.
   * @returns An Observable that emits the registered user as a User object.
   */
  public register(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}${COMPONENT_URL}`, user, {
      withCredentials: true,
    });
  }

  /**
   * Sends a logout request to the backend, clears cookies and local storage, and emits an empty user object to the loggedInUser$ Subject.
   * @returns An Observable that emits a string message indicating successful logout.
   */
  public logout(): Observable<string> {
    this.cookieService.delete('PHPSESSID', '/');
    localStorage.clear();
    this.loggedInUser$.next({} as User);
    const params: HttpParams = new HttpParams().set('logout', '');
    return this.http.get<string>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
      withCredentials: true,
    });
  }
}
