import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PageAction } from '../enums';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navbar')
  navbar: ElementRef;

  public isNavbarCollapsed: boolean = false;

  public get PageAction() {
    return PageAction;
  }

  constructor(private readonly navbarService: NavbarService) {}

  public toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.navbarService.isCollapsed$.next(this.isNavbarCollapsed);
    const value = getComputedStyle(this.navbar.nativeElement).getPropertyValue(
      'display'
    );
    console.log(value);

    const classes = this.navbar.nativeElement.classList;
    console.log('classes:', classes);
  }
}
