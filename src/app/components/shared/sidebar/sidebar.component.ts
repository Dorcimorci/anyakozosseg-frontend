import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PageAction } from '../enums';
import { NavbarService } from '../navbar/navbar.service';
import { RouteHistory, RouterService } from '../router.service';
import { routeToSingularTranslation } from '../utils';
import { SidebarItem } from './sidebar.model';
import { User } from '../user-model/user.model';
import { UserService } from '../user-service/user.service';

/**
 * SidebarComponent is a component that represents the sidebar of the application.
 * It provides navigation links and actions based on the current route and user role.
 */

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewChecked, OnInit {
  /**
   * Represents whether the navbar is collapsed or not.
   */
  public isNavbarCollapsed: boolean = false;

  /**
   * Represents whether to apply a greater top value or not.
   */
  public applyGreaterTopValue: boolean = false;

  /**
   * Represents the inner width of the window.
   */
  private innerWidth: number = 0;

  /**
   * Represents the first segment of the current route.
   */
  public currentRoutesFirstSegment: string = '';

  /**
   * Represents the previous route history.
   */
  public previousRoute: RouteHistory = {} as RouteHistory;

  /**
   * Represents whether the sidebar is shown or hidden.
   */
  public showSidebar: boolean = false;

  /**
   * Represents the items in the sidebar.
   */
  public sidebarItems: SidebarItem[] = [];

  /**
   * Gets the available page actions.
   * @returns The available page actions.
   */
  public get PageAction() {
    return PageAction;
  }

  /**
   * Represents the user information.
   */
  private user: User = {} as User;

  /**
   * Represents the sidebar view child element reference.
   */
  @ViewChild('sidebar')
  sidebar!: ElementRef;

  /**
   * Handles the window resize event for responsiveness.
   * @private
   */
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

  /**
   * Creates an instance of the component.
   * @constructor
   * @param router The Router service for navigating between routes.
   * @param routerService The RouterService for managing router-related functionality.
   * @param navbarService The NavbarService for managing navbar-related functionality.
   * @param userService The UserService for managing user-related functionality.
   */
  constructor(
    private readonly router: Router,
    private readonly routerService: RouterService,
    private readonly navbarService: NavbarService,
    private readonly userService: UserService
  ) {
    // Subscribe to the currentRoute$ observable to update the currentRoute, sidebar items, and show/hide sidebar accordingly.
    this.routerService.currentRoute$.subscribe((currentRoute: string) => {
      this.currentRoutesFirstSegment = currentRoute;
      this.initSidebarItems();
      this.showSidebar = [
        'brands',
        'ingredients',
        'products',
        'aboutus',
      ].includes(currentRoute);
    });

    // Subscribe to the previousRoute$ observable to update the previousRoute property.
    this.routerService.previousRoute$.subscribe(
      (previousRoute: RouteHistory) => {
        this.previousRoute = previousRoute;
      }
    );

    // Subscribe to the isCollapsed$ observable from the navbarService to update the isNavbarCollapsed and applyGreaterTopValue properties for responsiveness.
    this.navbarService.isCollapsed$.subscribe((isCollapsed: boolean) => {
      this.isNavbarCollapsed = isCollapsed;
      if (isCollapsed && this.innerWidth < 575) {
        this.applyGreaterTopValue = true;
      } else {
        this.applyGreaterTopValue = false;
      }
    });

    // Subscribe to the loggedInUser$ observable from the userService to update the user property.
    this.userService.loggedInUser$.subscribe(
      (user: User) => (this.user = user)
    );
  }

  /**
   * Initializes the component after Angular initializes the data-bound input properties.

   */
  public ngOnInit(): void {
    // Initialize the user property with data from local storage or from the loggedInUser$ observable.
    this.user = {
      id: Number(localStorage.getItem('userId')),
      username: localStorage.getItem('username') ?? '',
      role: localStorage.getItem('userRole') ?? '',
    };

    this.userService.loggedInUser$.subscribe(
      (user: User) => (this.user = user)
    );
  }

  /**
   * Lifecycle hook that is called after Angular checks the component's views and child views.
   */
  public ngAfterViewChecked(): void {
    // Call the initializeLeftProperty() method to perform any necessary initialization after the view has been checked.
    this.initializeLeftProperty();
  }
  /**
   * Navigates to the add new page for the current route.
   */
  public navigateToAddNewPage(): void {
    this.router.navigate([
      `${this.currentRoutesFirstSegment}/form/${PageAction.Create}`,
    ]);
  }

  /**
   * Navigates to the edit page for the current route.
   */
  public navigateToEditPage(): void {
    this.router.navigate([
      `${this.currentRoutesFirstSegment}/catalog/${PageAction.Update}`,
      'A',
    ]);
  }

  /**
   * Navigates to the delete page for the current route.
   */
  public navigateToDeletePage(): void {
    this.router.navigate([
      `${this.currentRoutesFirstSegment}/catalog/${PageAction.Delete}`,
      'A',
    ]);
  }

  /**
   * Navigates to the catalog page for the current route.
   */
  public navigateToCatalog(): void {
    this.router.navigate([
      `${this.currentRoutesFirstSegment}/catalog`,
      PageAction.Read,
      'A',
    ]);
  }

  /**
   * Navigates to the previous route, preserving any state information.
   */
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

  /**
   * Initializes the sidebar items based on the current route, user role, and visibility settings.
   */
  private initSidebarItems(): void {
    const menuItemName =
      routeToSingularTranslation[this.currentRoutesFirstSegment];
    this.sidebarItems = [
      {
        visibleOnPages: ['products', 'brands', 'ingredients'],
        visibleByRoles: [],
        label: `${menuItemName?.toUpperCase()} KERESÉSE ABC SZERINT`,
        iconClass: 'fa-solid fa-arrow-down-a-z',
        onClick: () => this.navigateToCatalog(),
      },
      {
        visibleOnPages: ['brands', 'ingredients', 'products'],
        visibleByRoles: ['admin'],
        label: `${menuItemName?.toUpperCase()} HOZZÁADÁSA`,
        iconClass: 'fa fa-file',
        onClick: () => this.navigateToAddNewPage(),
      },
      {
        visibleOnPages: ['brands', 'ingredients', 'products'],
        visibleByRoles: ['admin'],
        label: `${menuItemName?.toUpperCase()} SZERKESZTÉSE`,
        iconClass: 'fa-solid fa-pen',
        onClick: () => this.navigateToEditPage(),
      },
      {
        visibleOnPages: ['brands', 'ingredients', 'products'],
        visibleByRoles: ['admin'],
        label: `${menuItemName?.toUpperCase()} TÖRLÉSE`,
        iconClass: 'fa fa-trash',
        onClick: () => this.navigateToDeletePage(),
      },
      {
        visibleOnPages: ['brands', 'ingredients', 'products', 'aboutus'],
        visibleByRoles: [],
        label: `VISSZA`,
        iconClass: 'fa fa-angle-double-left',
        onClick: () => this.navigateToPreviousRoute(),
      },
    ].filter(
      (item: SidebarItem) =>
        item.visibleOnPages.includes(this.currentRoutesFirstSegment) &&
        (item.visibleByRoles.includes(this.user.role) ||
          item.visibleByRoles.length === 0)
    );
  }
}
