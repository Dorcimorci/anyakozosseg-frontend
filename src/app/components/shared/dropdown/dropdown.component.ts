import {
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor, OnDestroy {
  /**
   * The options to be shown in the dropdown
   */
  @Input() options: string[] = [];

  /**
   * The initial selected values index within the options array
   */
  @Input() defaultItemIndex: number = 0;

  /**
   * Callback for when selection changes
   */
  @Output() onSelectionChange: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {}

  public isDisabled: boolean = false;

  public selectedOption$: BehaviorSubject<string> = new BehaviorSubject(
    this.options[this.defaultItemIndex]
  );

  public writeValue(option: string) {
    this.onSelect(option);
  }

  public registerOnChange(onChange: Function): void {
    this.selectedOption$.subscribe((selectedOption: string) => {
      onChange(selectedOption);
      this.onSelectionChange.emit(selectedOption); // Emit the selected option
    });
  }

  public registerOnTouched(fn: any): void {}

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  public ngOnDestroy(): void {
    this.selectedOption$.unsubscribe();
  }

  public onSelect(selectedOption: string): void {
    this.defaultItemIndex = this.options.findIndex(
      (option: string) => option === selectedOption
    );
    this.selectedOption$.next(selectedOption);
  }
}
