import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterService } from '../shared/router.service';
import { User } from '../shared/user-model/user.model';
import { UserServiceService } from '../shared/user-service/user-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public title: string = 'BELÉPÉS';

  constructor(
    private readonly userService: UserServiceService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    const userId: string = activatedRoute.snapshot.paramMap.get('userId')!
    if(userId) {
      this.title="SIKERESEN REGISZTRÁLTÁL, LÉPJ BE AZ OLDALRA!"
    }
  }

  public user: User = {} as User;

  public login(): void {
    this.userService.login(this.user).subscribe(() => {
      this.router.navigate(['/login'],);
    });
  }
}
