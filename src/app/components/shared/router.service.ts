/**
 * Service for handling router-related functionality, such as getting the current route, previous route, and page action.
 */
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
} from 'rxjs';
import { PageAction } from './enums';

/**
 * Interface representing the history of a route.
 */
export interface RouteHistory {
  state: any;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  /**
   * Observable for the current route URL.
   */
  public readonly currentRoute$: Observable<string>;

  /**
   * Observable for the previous route history.
   */
  public readonly previousRoute$: Observable<RouteHistory>;

  /**
   * BehaviorSubject for the current page action.
   * @private
   */
  private readonly pageActionSub: BehaviorSubject<PageAction> =
    new BehaviorSubject<PageAction>(PageAction.Read);

  /**
   * Observable for the current page action.
   */
  public readonly pageAction$: Observable<PageAction> = this.pageActionSub
    .asObservable()
    .pipe(shareReplay());

  /**
   * Constructor of RouterService.
   * @param router The Router instance from Angular router module.
   */
  constructor(private readonly router: Router) {
    // Get the current route URL and update the page action
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
        } else {
          this.pageActionSub.next(PageAction.Read);
        }
        return routes[1];
      })
    );

    // Get the previous route history
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
