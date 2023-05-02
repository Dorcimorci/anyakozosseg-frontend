import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

/**
 * Represents a rating component that allows users to select a rating
 * by clicking on stars.
 */
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
  /**
   * Sets the default rating value for the rating component.
   * @param rating - The default rating value.
   */
  @Input() set defaultRating(rating: number) {
    this.ratingToShow$.next(rating);
    this.rating$.next(rating);
  }

  /**
   * Sets the disabled state of the rating component.
   * @param value - The disabled state value.
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  /**
   * Represents the current rating value to be displayed in the UI.
   * This property is used to keep track of the rating value that is currently
   * being shown in the UI, and is updated when the user interacts with the rating
   * component (e.g., clicks on a star).
   */
  public ratingToShow = 0;

  /**
   * Represents the current rating value.
   * This property is used to store the actual rating value, and is updated
   * when the user interacts with the rating component (e.g., clicks on a star).
   * It can also be set programmatically using the `writeValue` method to set the
   * initial value of the rating component.
   */
  public rating = 0;

  /**
   * An array of numbers representing the possible rating steps for the rating component.
   * For example, a value of [1, 2, 3, 4, 5] would indicate a maximum rating of 5 stars.
   */
  public ratingSteps: number[] = [1, 2, 3, 4, 5];

  /**
   * Represents an Observable BehaviorSubject that holds the current rating value.
   * This property is used to keep track of the current rating value as an Observable,
   * which allows for easy subscription and updates when the rating value changes.
   */
  public rating$: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * Represents an Observable BehaviorSubject that holds the current rating value to be displayed.
   * This property is used to keep track of the rating value that is currently being shown in the UI
   * as an Observable, which allows for easy subscription and updates when the rating value to be
   * displayed changes.
   */
  public ratingToShow$: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * Represents a boolean flag that indicates whether the rating component is disabled.
   * This property is used to keep track of whether the rating component is currently disabled,
   * and is updated when the `setDisabledState` method is called. It is also used to control
   * the behavior of the rating component in the UI (e.g., disabling user interactions).
   */
  public isDisabled: boolean = false;

  /**
   * Writes a new rating value to the rating component.
   * This method is used to set a new rating value to the rating component, and updates
   * the `ratingToShow$` and `rating$` BehaviorSubjects with the new value.
   *
   * @param rating The new rating value to be set.
   */
  public writeValue(rating: number) {
    this.ratingToShow$.next(rating);
    this.rating$.next(rating);
  }

  /**
   * Registers a callback function to be called when the rating value changes.
   * This method is used to register a callback function to be called when the rating value
   * changes, and updates the `rating$` BehaviorSubject with the new value. It also updates
   * the local `rating` property with the new value.
   *
   * @param onChange The callback function to be called when the rating value changes.
   */
  public registerOnChange(onChange: Function): void {
    this.rating$.subscribe((rating: number) => {
      onChange(rating);
      this.rating = rating;
    });
  }

  /**
   * Registers a callback function to be called when the rating component is touched.
   * This method is used to register a callback function to be called when the rating component
   * is touched (e.g., clicked), but does not perform any specific action in this implementation.
   *
   * @param fn The callback function to be called when the rating component is touched.
   */
  public registerOnTouched(fn: any): void {}

  /**
   * Sets the disabled state of the rating component.
   * This method is used to set the disabled state of the rating component, and updates
   * the local `isDisabled` property accordingly. It is called by the Angular form control
   * when the disabled state of the form control changes.
   *
   * @param isDisabled A boolean flag that indicates whether the rating component should be disabled.
   */
  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * This method is used to subscribe to changes in the `ratingToShow$` BehaviorSubject,
   * and updates the local `ratingToShow` property with the new value when it changes.
   */
  public ngOnInit(): void {
    this.ratingToShow$.subscribe(
      (rating: number) => (this.ratingToShow = rating)
    );
  }

  /**
   * Lifecycle hook that is called when the component is being destroyed.
   * This method is used to unsubscribe from the `rating$` and `ratingToShow$` BehaviorSubjects
   * to prevent memory leaks when the component is destroyed.
   */
  public ngOnDestroy(): void {
    this.rating$.unsubscribe();
    this.ratingToShow$.unsubscribe();
  }

  /**
   * Callback function that is called when a star is clicked.
   * This method is used to update the `ratingToShow$` and `rating$` BehaviorSubjects with
   * the new rating value when a star is clicked, unless the component is disabled.
   *
   * @param rating The new rating value clicked by the user.
   */
  public onStarClicked(rating: number) {
    if (!this.isDisabled) {
      this.ratingToShow$.next(rating);
      this.rating$.next(rating);
    }
  }

  /**
   * Callback function that is called when a star is hovered over.
   * This method is used to update the `ratingToShow` property with the hovered rating value,
   * unless the component is disabled.
   *
   * @param rating The rating value being hovered over by the user.
   */
  public onStarHovered(rating: number) {
    if (!this.isDisabled) {
      this.ratingToShow = rating;
    }
  }

  /**
   * Callback function that is called when the mouse leaves a star.
   * This method is used to update the `ratingToShow` property with the current rating value,
   * unless the component is disabled.
   *
   * @param rating The current rating value.
   */
  public onStarLeft(rating: number) {
    if (!this.isDisabled) {
      this.ratingToShow = this.rating;
    }
  }

  /**
   * Utility function to round a number to the nearest half.
   * This method is used to round a number to the nearest half, which is commonly used
   * for displaying ratings with half-star increments.
   *
   * @param num The number to be rounded.
   * @returns The rounded number to the nearest half.
   */
  public roundToHalf(num: number) {
    return Math.round(num * 2) / 2;
  }

  /**
   * Returns the appropriate CSS class for a star icon based on the current rating step.
   *
   * @param ratingStep - The current rating step.
   * @returns The CSS class for the star icon.
   */
  public getStarClass(ratingStep: number): string {
    const roundedRating: number = Math.round(this.ratingToShow);
    const roundedHalf: number = this.roundToHalf(this.ratingToShow);
    const half: number = 0.5;
    const one: number = 1;

    if (ratingStep <= roundedHalf) {
      return 'fa-solid fa-star';
    } else if (
      ratingStep === Math.floor(roundedHalf) + one &&
      Math.abs(roundedRating - roundedHalf) === half
    ) {
      return 'fas fa-star-half-alt';
    } else {
      return 'fa-regular fa-star';
    }
  }
}
