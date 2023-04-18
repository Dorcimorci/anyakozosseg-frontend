import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../user-model/user.model';
import { CookieService } from 'ngx-cookie-service';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User
  );

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  public login(user: User): Observable<User> {
    const params: HttpParams = new HttpParams().set('login', '');
    return this.http.post<User>(`${BASE_URL}${COMPONENT_URL}`, user, {
      params,
      withCredentials: true,
    });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}${COMPONENT_URL}`, user, {
      withCredentials: true,
    });
  }

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
