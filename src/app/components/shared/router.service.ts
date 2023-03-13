import { Injectable } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event,
  ActivatedRoute,
  ParamMap,
} from '@angular/router';
import {
  filter,
  first,
  map,
  Observable,
  share,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { PageAction } from './enums';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  public readonly currentRoute$: Observable<string>;
  private readonly pageActionSubject: Subject<PageAction> = new Subject();
  public readonly pageAction$: Observable<PageAction> = this.pageActionSubject
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
          this.pageActionSubject.next(action);
        }
        return routes[1];
      })
    );
  }
}
