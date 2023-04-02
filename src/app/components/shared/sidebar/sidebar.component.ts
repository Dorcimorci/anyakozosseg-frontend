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
import { SidebarItem } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewChecked {
  public isNavbarCollapsed: boolean = false;
  public applyGreaterTopValue: boolean = false;
  private innerWidth: number = 0;
  public currentRoute: string = '';
  public previousRoute: RouteHistory = {} as RouteHistory;

  public showSidebar: boolean = false;

  public sidebarItems: SidebarItem[] = [];

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
      this.currentRoute = currentRoute;
      this.initSidebarItems();
      this.showSidebar = [
        'brands',
        'ingredients',
        'products',
        'aboutus',
      ].includes(currentRoute);
    });

    this.routerService.previousRoute$.subscribe(
      (previousRoute: RouteHistory) => {
        this.previousRoute = previousRoute;
      }
    );

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

  public initSidebarItems(): void {
    const menuItemName = routeToSingularTranslation[this.currentRoute];
    this.sidebarItems = [
      {
        showOnPages: ['products'],
        visibleByRoles: [],
        label: `${menuItemName?.toUpperCase()} KERESÉSE ABC SZERINT`,
        iconClass: 'fa-solid fa-arrow-down-a-z',
        onClick: () => this.navigateToCatalog(),
      },
      {
        showOnPages: ['brands', 'ingredients', 'products'],
        visibleByRoles: [],
        label: `${menuItemName?.toUpperCase()} HOZZÁADÁSA`,
        iconClass: 'fa fa-file',
        onClick: () => this.navigateToAddNewPage(),
      },
      {
        showOnPages: ['brands', 'ingredients', 'products'],
        visibleByRoles: [],
        label: `${menuItemName?.toUpperCase()} SZERKESZTÉSE`,
        iconClass: 'fa-solid fa-pen',
        onClick: () => this.navigateToEditPage(),
      },
      {
        showOnPages: ['brands', 'ingredients', 'products'],
        visibleByRoles: [],
        label: `${menuItemName?.toUpperCase()} TÖRLÉSE`,
        iconClass: 'fa fa-trash',
        onClick: () => this.navigateToDeletePage(),
      },
      {
        showOnPages: ['brands', 'ingredients', 'products', 'aboutus'],
        visibleByRoles: [],
        label: `VISSZA`,
        iconClass: 'fa fa-angle-double-left',
        onClick: () => this.navigateToPreviousRoute(),
      },
    ].filter((item: SidebarItem) =>
      item.showOnPages.includes(this.currentRoute)
    );
  }

  public ngAfterViewChecked(): void {
    this.initializeLeftProperty();
  }

  public navigateToAddNewPage(): void {
    this.router.navigate([`${this.currentRoute}/form/${PageAction.Create}`]);
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

  public navigateToCatalog(): void {
    this.router.navigate(['/products/catalog', PageAction.Read, 'A']);
  }

  public navigateToPreviousRoute(): void {
    if (this.previousRoute.state) {
      this.router.navigate([
        this.previousRoute.url,
        { state: this.previousRoute.state },
      ]);
    } else {
      this.router.navigate([this.previousRoute.url]);
    }
  }

  /**
   * Initializes the CSS custom property '--item-width' for each sidebar item by calculating their
   * current clientWidth in pixels.
   *
   * This method is called whenever the sidebar element is available (afterViewInit lifecycle hook).
   * It loops through all the '.sidebar' elements within the sidebar and sets their '--item-width'
   * property to their current clientWidth in pixels.
   *
   * This custom property is used to correctly position the dropdown menu items within the sidebar.
   */
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
