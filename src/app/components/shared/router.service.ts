import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter, map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  public currentRoute$: Observable<string>;

  constructor(private readonly router: Router) {
    this.currentRoute$ = this.router.events.pipe(
      shareReplay(),
      filter((event: Event) => event instanceof NavigationEnd),
      map((event) => {
        const url = (event as any).url;
        const routes = url.toLowerCase().split('/');
        return routes[1];
      })
    );
  }
}
