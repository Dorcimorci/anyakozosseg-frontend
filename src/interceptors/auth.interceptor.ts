import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, EMPTY, throwError } from 'rxjs';
import { User } from 'src/app/components/shared/user-model/user.model';
import { UserService } from 'src/app/components/shared/user-service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.userService.logout().subscribe(() => {
            this.router.navigate(['/login']);
            this.userService.loggedInUser$.next({} as User);
          });
          return EMPTY;
        } else {
          return throwError(() => new Error('Something went wrong!' + error));
        }
      })
    );
  }
}
