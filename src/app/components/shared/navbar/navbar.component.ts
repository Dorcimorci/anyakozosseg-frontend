import { Router } from '@angular/router';
import { PageAction } from '../enums';
import { NavbarService } from './navbar.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navbar')
  navbar!: ElementRef;

  public isNavbarCollapsed: boolean = false;

  public get PageAction() {
    return PageAction;
  }

  constructor(
    private readonly navbarService: NavbarService,
    private readonly router: Router
  ) {}

  public toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.navbarService.isCollapsed$.next(this.isNavbarCollapsed);
    const navbarToggler =
      this.navbar.nativeElement.querySelector('.navbar-toggler');
    navbarToggler.classList.toggle('navbar-expanded', !this.isNavbarCollapsed);
  }
}
