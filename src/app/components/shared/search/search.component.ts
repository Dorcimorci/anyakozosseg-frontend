import { Component, NgZone } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { SearchResult } from './search.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public readonly search$: Subject<string> = new Subject<string>();
  public searchResults: SearchResult[] = []; // change the type of searchResults to SearchResult[]
  public query: string = '';
  public focus = false;

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
      .subscribe((results: SearchResult[]) => (this.searchResults = results)); // change the type of results to SearchResult[]
  }

  public onSearch(): void {
    this.search$.next(this.query);
  }

  public onFocus(): void {
    this.focus = true;
  }

  public onBlur(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.focus = false;
        });
      }, 200);
    });
  }

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

  public navigateToResultDetails(result: SearchResult): void {
    this.router.navigate([`/${result.sourceTable}/details/${result.id}`]);
  }
}
