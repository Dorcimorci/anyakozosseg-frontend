import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PageAction } from '../enums';
import { NavbarService } from '../navbar/navbar.service';
import { RouterService } from '../router.service';
import { routeToSingularTranslation } from '../utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  public menuItemName: string = '';

  public isNavbarCollapsed: boolean = false;
  public applyGreaterTopValue: boolean = false;
  private innerWidth: number = 0;
  private currentRoute: string = '';

  public showSidebar: boolean = true;

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

    this.routerService.pageAction$.subscribe((pageAction: PageAction) => {
      console.log(pageAction);
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

  public ngAfterViewInit(): void {
    setTimeout(() => this.initializeLeftProperty());
  }

  public getAddNewRouterLink(): string {
    return `${this.currentRoute}/${this.currentRoute}-form/${PageAction.Create}`;
  }

  private initializeLeftProperty(): void {
    const sidebarItems: HTMLElement[] =
      this.sidebar.nativeElement.querySelectorAll('.sidebar');
    sidebarItems.forEach((item: HTMLElement) => {
      const widthInPx: number = item.clientWidth;
      item.style.setProperty('--item-width', `${widthInPx}px`);
    });
  }
}
