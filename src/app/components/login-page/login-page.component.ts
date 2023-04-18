import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/user-model/user.model';
import { UserService } from '../shared/user-service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public title: string = 'BELÉPÉS';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    const userId: string = this.activatedRoute.snapshot.paramMap.get('userId')!;
    if (userId) {
      this.title = 'SIKERESEN REGISZTRÁLTÁL, LÉPJ BE AZ OLDALRA!';
    }
  }

  public user: User = {} as User;
  public showLoginError: boolean = false;

  public login(): void {
    this.userService.login(this.user).subscribe((user: User) => {
      this.userService.loggedInUser$.next(user);
      if (user.username) {
        this.router.navigate(['']);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', String(user.id));
      } else {
        this.showLoginError = true;
      }
    });
  }
}
