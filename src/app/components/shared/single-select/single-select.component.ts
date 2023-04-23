import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IDropdownSettings,
  ListItem,
} from 'ng-multiselect-dropdown/multiselect.model';
import { BehaviorSubject } from 'rxjs';
import { Option } from './option.model';

/**
 * Custom single select component that implements ControlValueAccessor to work with Angular forms.
 * This component provides a dropdown with options to select a single value.
 */
@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SingleSelectComponent,
    },
  ],
})
export class SingleSelectComponent implements ControlValueAccessor, OnDestroy {
  /**
   * Input property to enable or disable search filter in the dropdown.
   */
  @Input() set allowSearchFilter(allow: boolean) {
    this.settings = { ...this.settings, allowSearchFilter: allow };
  }

  /**
   * The settings for the dropdown.
   */
  @Input() settings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: this.allowSearchFilter,
    searchPlaceholderText: 'Keresés',
    closeDropDownOnSelection: true,
    defaultOpen: false,
    noFilteredDataAvailablePlaceholderText:
      'Nincs a keresési feltételnek megfelelő találat',
    noDataAvailablePlaceholderText: 'Nincsenek elérhető listaelemek',
  };

  /**
   * The options to be shown in the dropdown.
   */
  @Input() data: Option[] = [];

  /**
   * The initial selected option.
   */
  @Input() defaultOption: Option = this.data[0];

  /**
   * The placeholder text to be shown when no option is selected.
   */
  @Input() placeholder: string = 'Placeholder';

  /**
   * Output event emitter for search/filter changes in the dropdown.
   */
  @Output() onSearch: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  /**
   * Output event emitter for selection changes in the dropdown.
   */
  @Output() onSelectionChange: EventEmitter<ListItem> =
    new EventEmitter<ListItem>();

  /**
   * The disabled state of the component.
   */
  public isDisabled: boolean = false;

  /**
   * The selected option as a BehaviorSubject, used for two-way data binding.
   */
  public selectedOption$: BehaviorSubject<Option> = new BehaviorSubject(
    this.defaultOption
  );

  /**
   * The currently selected option.
   */
  public selectedOption: Option = {} as Option;

  /**
   * Writes a value to the component.
   * @param option - The value to be written.
   */
  public writeValue(option: Option) {
    this.onSelect(option);
    this.selectedOption = option;
  }

  /**
   * Registers a function to be called when the value changes.
   * @param onChange - The function to be registered.
   */
  public registerOnChange(onChange: Function): void {
    this.selectedOption$.subscribe((selectedOption: Option) => {
      onChange(selectedOption);
    });
  }

  /**
   * Registers a function to be called when the component is touched.
   * @param fn - The function to be registered.
   */
  public registerOnTouched(_fn: any): void {}

  /**
   * Sets the disabled state of the component.
   * @param isDisabled A boolean value indicating whether the component should be disabled or not.
   */
  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * Unsubscribes from the selectedOption$ BehaviorSubject to prevent memory leaks.
   */
  public ngOnDestroy(): void {
    this.selectedOption$.unsubscribe();
  }

  /**
   * Handles the selection of an option in the dropdown.
   * @param selectedOption The selected option object.
   */
  public onSelect(selectedOption: any): void {
    this.selectedOption$.next(selectedOption);
    this.onSelectionChange.emit(selectedOption);
  }

  /**
   * Handles the change in the search filter input value.
   * @param listItem The selected item from the dropdown's search filter.
   */
  public onFilterChange(listItem: ListItem): void {
    this.onSearch.emit(listItem);
  }
}
