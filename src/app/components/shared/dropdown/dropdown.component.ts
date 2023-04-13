import {
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Option } from './dropdown.model';

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
  @Input() options: Option[] = [];

  /**
   * The initial selected option
   */
  @Input() defaultOption: Option = this.options[0];

  /**
   * Callback for when selection changes
   */
  @Output() onSelectionChange: EventEmitter<Option> =
    new EventEmitter<Option>();

  constructor() {}

  public isDisabled: boolean = false;

  public selectedOption$: BehaviorSubject<Option> = new BehaviorSubject(
    this.defaultOption
  );

  public writeValue(option: Option) {
    this.onSelect(option);
  }

  public registerOnChange(onChange: Function): void {
    this.selectedOption$.subscribe((selectedOption: Option) => {
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

  public onSelect(selectedOption: Option): void {
    this.selectedOption$.next(selectedOption);
  }
}
