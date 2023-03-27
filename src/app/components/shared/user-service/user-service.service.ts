import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user-model/user.model';

const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private readonly http: HttpClient) {}

  public login(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}${COMPONENT_URL}`, user);
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}${COMPONENT_URL}`, user);
  }
}
