import { RouterService } from './../shared/router.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user-model/user.model';
import { UserService } from '../shared/user-service/user.service';

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss'],
})
export class RegPageComponent {
  public user: User = {} as User;
  public showDuplicateUsernameError: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  public register(): void {
    this.userService.register(this.user).subscribe((response) => {
      if (+response) {
        this.router.navigate(['/login', response]);
      } else {
        this.showDuplicateUsernameError = true;
      }
    });
  }

  public onUsernameInput(): void {
    this.showDuplicateUsernameError = false;
  }
}
