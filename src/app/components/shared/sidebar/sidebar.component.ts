import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageAction } from '../enums';
import { NavbarService } from '../navbar/navbar.service';
import { RouteHistory, RouterService } from '../router.service';
import { routeToSingularTranslation } from '../utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewChecked {
  public menuItemName: string = '';

  public isNavbarCollapsed: boolean = false;
  public applyGreaterTopValue: boolean = false;
  private innerWidth: number = 0;
  public currentRoute: string = '';
  public previousRoute$: Observable<RouteHistory> =
    this.routerService.previousRoute$;

  public showSidebar: boolean = false;

  public get PageAction() {
    return PageAction;
  }

  @ViewChild('sidebar')
  sidebar!: ElementRef;

  // needed for responsiveness
  @HostListener('window:resize', [])
  private onResize() {
    this.innerWidth = window.innerWidth;
    if (this.isNavbarCollapsed && window.innerWidth < 575) {
      this.applyGreaterTopValue = true;
    } else {
      this.applyGreaterTopValue = false;
    }
    this.initializeLeftProperty();
  }

  constructor(
    private readonly router: Router,
    private readonly routerService: RouterService,
    private readonly navbarService: NavbarService
  ) {
    this.routerService.currentRoute$.subscribe((currentRoute: string) => {
      this.menuItemName = routeToSingularTranslation[currentRoute];
      this.currentRoute = currentRoute;

      this.showSidebar = ['brands', 'ingredients', 'products'].includes(
        currentRoute
      );
    });

    // needed for responsiveness
    this.navbarService.isCollapsed$.subscribe((isCollapsed: boolean) => {
      this.isNavbarCollapsed = isCollapsed;
      if (isCollapsed && this.innerWidth < 575) {
        this.applyGreaterTopValue = true;
      } else {
        this.applyGreaterTopValue = false;
      }
    });
  }

  public ngAfterViewChecked(): void {
    this.initializeLeftProperty();
  }

  public getAddNewRouterLink(): string {
    return `${this.currentRoute}/form/${PageAction.Create}`;
  }

  public navigateToEditPage(): void {
    switch (this.currentRoute) {
      case 'products':
        this.router.navigate([
          `${this.currentRoute}/catalog/${PageAction.Update}`,
          'A',
        ]);
        break;
      default:
        this.router.navigate([`${this.currentRoute}/${PageAction.Update}`]);
    }
  }

  public navigateToDeletePage(): void {
    switch (this.currentRoute) {
      case 'products':
        this.router.navigate([
          `${this.currentRoute}/catalog/${PageAction.Delete}`,
          'A',
        ]);
        break;
      default:
        this.router.navigate([`${this.currentRoute}/${PageAction.Delete}`]);
    }
  }

  private initializeLeftProperty(): void {
    if (this.sidebar) {
      const sidebarItems: HTMLElement[] =
        this.sidebar.nativeElement.querySelectorAll('.sidebar');
      sidebarItems.forEach((item: HTMLElement) => {
        const widthInPx: number = item.clientWidth;
        item.style.setProperty('--item-width', `${widthInPx}px`);
      });
    }
  }
}
