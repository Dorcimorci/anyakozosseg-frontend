import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/user-model/user.model';
import { UserService } from '../shared/user-service/user.service';

/**
 * Represents the Login Page component for user authentication.
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  /**
   * Title displayed on the login page.
   */
  public title: string = 'BELÉPÉS';

  /**
   * User object for login credentials.
   */
  public user: User = {} as User;

  /**
   * Flag indicating if login error should be shown.
   */
  public showLoginError: boolean = false;

  /**
   * Creates an instance of LoginPageComponent.
   *
   * @param userService - The UserService for user authentication.
   * @param router - The Router for navigating to different pages.
   * @param activatedRoute - The ActivatedRoute for getting URL parameters.
   */
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    // Check if userId parameter exists in the URL and update title accordingly
    const userId: string = this.activatedRoute.snapshot.paramMap.get('userId')!;
    if (userId) {
      this.title = 'SIKERESEN REGISZTRÁLTÁL, LÉPJ BE AZ OLDALRA!';
    }
  }

  /**
   * Performs user login with the provided credentials.
   * If login is successful, navigates to the home page, sets the logged-in user in UserService,
   * and stores user information in local storage for future use.
   * If login fails, sets showLoginError flag to true, which triggers the display of
   * "Helytelen felhasználónév vagy jelszó!" error message in the template.
   */
  public login(): void {
    this.userService.login(this.user).subscribe((user: User) => {
      if (user.username) {
        this.router.navigate(['']);
        this.userService.loggedInUser$.next(user);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', String(user.id));
      } else {
        this.showLoginError = true;
      }
    });
  }
}
