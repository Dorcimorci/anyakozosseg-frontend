import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  public currentRoute: string = '';

  @ViewChild('sidenav')
  sidenav!: ElementRef;

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

  private initializeLeftProperty(): void {
    const widthInPx: number = this.sidenav.nativeElement.clientWidth;
    const sidenavStyle = this.sidenav.nativeElement.style;
    sidenavStyle.setProperty('--left', `-${widthInPx * 0.85}px`);
  }
}
