import { Component, Input, OnDestroy, OnInit, Pipe } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RatingComponent,
    },
  ],
})
export class RatingComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() set defaultRating(rating: number) {
    this.ratingToShow$.next(rating);
    this.rating$.next(rating);
  }

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  public get Math() {
    return Math;
  }

  public ratingToShow = 0;
  public rating = 0;

  // The number of stars to display
  public ratingSteps: number[] = [1, 2, 3, 4, 5];

  public rating$: BehaviorSubject<number> = new BehaviorSubject(0);
  public ratingToShow$: BehaviorSubject<number> = new BehaviorSubject(0);

  public isDisabled: boolean = false;

  public writeValue(rating: number) {
    this.ratingToShow$.next(rating);
    this.rating$.next(rating);
  }

  public registerOnChange(onChange: Function): void {
    this.rating$.subscribe((rating: number) => {
      onChange(rating);
      this.rating = rating;
    });
  }

  public registerOnTouched(fn: any): void {}
  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  public ngOnInit(): void {
    this.ratingToShow$.subscribe(
      (rating: number) => (this.ratingToShow = rating)
    );
  }

  public ngOnDestroy(): void {
    this.rating$.unsubscribe();
    this.ratingToShow$.unsubscribe();
  }

  public onStarClicked(rating: number) {
    if (!this.isDisabled) {
      this.ratingToShow$.next(rating);
      this.rating$.next(rating);
    }
  }

  public onStarHovered(rating: number) {
    if (!this.isDisabled) {
      this.ratingToShow = rating;
    }
  }

  public onStarLeft(rating: number) {
    if (!this.isDisabled) {
      this.ratingToShow = this.rating;
    }
  }

  public roundToHalf(num: number) {
    return Math.round(num * 2) / 2;
  }

  public getStarClass(ratingStep: number): string {
    const roundedRating = Math.round(this.ratingToShow);
    const roundedHalf = this.roundToHalf(this.ratingToShow);

    if (ratingStep <= roundedHalf) {
      return 'fa-solid fa-star';
    } else if (
      ratingStep === Math.floor(roundedHalf) + 1 &&
      Math.abs(roundedRating - roundedHalf) === 0.5
    ) {
      return 'fas fa-star-half-alt';
    } else {
      return 'fa-regular fa-star';
    }
  }
}
