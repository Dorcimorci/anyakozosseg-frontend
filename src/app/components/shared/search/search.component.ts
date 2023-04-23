import { Component, NgZone } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { SearchResult } from './search.model';
import { Router } from '@angular/router';

/**
 * Represents a search component that allows users to search for items and displays search results.
 *
 * @remarks
 * The `SearchComponent` class provides functionality for searching items using a search service,
 * displaying search results, and navigating to details of search results. It also handles user
 * interactions such as focus and blur events for the search input field.
 *
 * @class SearchComponent
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public readonly search$: Subject<string> = new Subject<string>();
  public searchResults: SearchResult[] = [];
  public query: string = '';
  public focus = false;

  /**
   * Creates an instance of `SearchComponent`.
   *
   * @param searchService - The search service used for searching items.
   * @param router - The Angular router used for navigating to item details.
   * @param ngZone - The Angular zone used for handling asynchronous events.
   */
  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => this.searchService.search(query))
      )
      .subscribe((results: SearchResult[]) => (this.searchResults = results));
  }

  /**
   * Handles the search event triggered by the user.
   */
  public onSearch(): void {
    this.search$.next(this.query);
  }

  /**
   * Handles the focus event triggered by the search input field.
   */
  public onFocus(): void {
    this.focus = true;
  }

  /**
   * Handles the blur event triggered by the search input field.
   */
  public onBlur(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.focus = false;
        });
      }, 200);
    });
  }

  /**
   * Gets the item type based on the source table.
   *
   * @param sourceTable - The source table of the item.
   * @returns The item type as a string.
   */
  public getItemType(sourceTable: string): string {
    switch (sourceTable) {
      case 'products':
        return 'Termék';
      case 'brands':
        return 'Márka';
      case 'ingredients':
        return 'Összetevő';
      default:
        return '';
    }
  }

  /**
   * Navigates to the details page of a search result based on the id of the result and the name of the source-table.
   * The name of the source-table matches the first segment of the route for the details page of a search-result.
   *
   * @param result - The search result to navigate to.
   */
  public navigateToResultDetails(result: SearchResult): void {
    this.router.navigate([`/${result.sourceTable}/details/${result.id}`]);
  }
}
