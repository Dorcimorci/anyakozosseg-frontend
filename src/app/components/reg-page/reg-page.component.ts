import { RouterService } from './../shared/router.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user-model/user.model';
import { UserServiceService } from '../shared/user-service/user-service.service';

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss'],
})
export class RegPageComponent {
  public user: User = {} as User;

  constructor(
    private readonly userService: UserServiceService,
    private readonly router: Router,

  ) {}

  public register(): void {
    this.userService
      .register(this.user)
      .subscribe((userId) => this.router.navigate(['/login', userId]));
  }
}
