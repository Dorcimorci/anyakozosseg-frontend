import { Component } from '@angular/core';
import { RouterService } from './components/shared/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'anyakozosseg';

  public showSideBar: boolean = true;

  constructor(routerService: RouterService) {
    routerService.currentRoute$.subscribe(
      (currentRoute: string) =>
        (this.showSideBar = ['brands', 'ingredients', 'products'].includes(
          currentRoute
        ))
    );
  }
}
