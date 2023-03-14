import { Injectable } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event,
  RoutesRecognized,
} from '@angular/router';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  pairwise,
  shareReplay,
  Subject,
} from 'rxjs';
import { PageAction } from './enums';

export interface RouteHistory {
  state: any;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  public readonly currentRoute$: Observable<string>;
  public readonly previousRoute$: Observable<RouteHistory>;
  private readonly pageActionSub: BehaviorSubject<PageAction> =
    new BehaviorSubject<PageAction>(PageAction.Read);
  public readonly pageAction$: Observable<PageAction> = this.pageActionSub
    .asObservable()
    .pipe(shareReplay());

  constructor(private readonly router: Router) {
    this.currentRoute$ = this.router.events.pipe(
      shareReplay(),
      filter((event: Event) => event instanceof NavigationEnd),
      map((event) => {
        const url = (event as any).url;
        const routes = url.toLowerCase().split('/');
        const action = routes.find((route: string) =>
          Object.values(PageAction).includes(route as PageAction)
        );
        if (action) {
          this.pageActionSub.next(action);
        }
        return routes[1];
      })
    );

    this.previousRoute$ = this.router.events.pipe(
      filter((evt: any) => evt instanceof RoutesRecognized),
      pairwise(),
      map((events: RoutesRecognized[]) => {
        const previousUrl: string = events[0].urlAfterRedirects;
        // const currentUrl: string = events[1].urlAfterRedirects;
        const previousRoute: RouteHistory = {
          state:
            this.router.getCurrentNavigation()?.previousNavigation?.extras
              .state,
          url: previousUrl,
        };
        return previousRoute;
      })
    );
  }
}
