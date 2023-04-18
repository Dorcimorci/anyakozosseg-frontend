import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageAction } from '../enums';
import { User } from '../user-model/user.model';
import { UserService } from '../user-service/user.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navbar')
  navbar!: ElementRef;

  public isNavbarCollapsed: boolean = false;
  public loggedInUser: User = {} as User;

  public get PageAction() {
    return PageAction;
  }

  constructor(
    private readonly navbarService: NavbarService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    userService.loggedInUser$.subscribe((user: User) => {
      this.loggedInUser = user;
    });

    if (!this.loggedInUser.username) {
      this.loggedInUser = {
        id: Number(localStorage.getItem('userId')),
        username: localStorage.getItem('username'),
        role: localStorage.getItem('userRole'),
      } as User;
    }
  }

  public toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.navbarService.isCollapsed$.next(this.isNavbarCollapsed);
    const navbarToggler =
      this.navbar.nativeElement.querySelector('.navbar-toggler');
    navbarToggler.classList.toggle('navbar-expanded', !this.isNavbarCollapsed);
  }

  public onUserIconClick(): void {
    if (this.isUserLoggedIn()) {
      this.userService
        .logout()
        .subscribe(() => this.router.navigate(['/login']));
    } else {
      this.router.navigate(['/login']);
    }
  }

  public isUserLoggedIn(): boolean {
    return !!this.loggedInUser.username;
  }
}
