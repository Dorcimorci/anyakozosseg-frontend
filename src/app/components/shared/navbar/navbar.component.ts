import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageAction } from '../enums';
import { User } from '../user-model/user.model';
import { UserService } from '../user-service/user.service';
import { NavbarService } from './navbar.service';

/**
 * The NavbarComponent represents the navigation bar of the application.
 * It provides functionality for toggling the collapsed state of the navbar,
 * handling user icon click events, and checking if the user is logged in.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navbar')
  navbar!: ElementRef;

  /** Whether the navbar is collapsed or not. */
  public isNavbarCollapsed: boolean = false;
  /** The logged-in user. */
  public loggedInUser: User = {} as User;

  /**
   * Enum for page actions.
   */
  public get PageAction() {
    return PageAction;
  }

  /**
   * Creates an instance of NavbarComponent.
   * @param navbarService The NavbarService for handling navbar-related functionality.
   * @param userService The UserService for handling user-related functionality.
   * @param router The Router for navigating to different routes.
   */
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

  /**
   * Toggles the collapsed state of the navbar.
   */
  public toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.navbarService.toggleNavbar();
  }

  /**
   * Handles user icon click event, performing logout if the user is logged in,
   * or navigating to the login page if the user is not logged in.
   */
  public onUserIconClick(): void {
    if (this.isUserLoggedIn()) {
      this.userService
        .logout()
        .subscribe(() => this.router.navigate(['/login']));
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Checks if the user is logged in.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  public isUserLoggedIn(): boolean {
    return !!this.loggedInUser.username;
  }
}
