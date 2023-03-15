import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public isCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
