import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * The NavbarService provides functionality for managing the collapsed state of the navbar.
 * It uses a BehaviorSubject to track the current collapsed state, and provides methods
 * for updating and observing the state.
 */
@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  /**
   * @private BehaviorSubject to track the collapsed state of the navbar.
   */
  private isNavbarCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  /**
   * Gets the observable for the collapsed state of the navbar.
   * @returns An Observable that emits a boolean value indicating whether the navbar is collapsed or not.
   */
  public get isCollapsed$(): Observable<boolean> {
    return this.isNavbarCollapsed$.asObservable();
  }

  /**
   * Toggles the collapsed state of the navbar.
   */
  public toggleNavbar(): void {
    this.isNavbarCollapsed$.next(!this.isNavbarCollapsed$.value);
  }
}
