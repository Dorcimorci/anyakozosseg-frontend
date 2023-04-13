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
import { Option } from '../dropdown/dropdown.model';

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
  @Input() set allowSearchFilter(allow: boolean) {
    this.settings = { ...this.settings, allowSearchFilter: allow };
  }

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
   * The options to be shown in the dropdown
   */
  @Input() data: Option[] = [];

  /**
   * The initial selected option
   */
  @Input() defaultOption: Option = this.data[0];

  /**
   * The initial selected option
   */
  @Input() placeholder: string = 'Placeholder';

  @Output() onSearch: EventEmitter<ListItem> = new EventEmitter<ListItem>();
  @Output() onSelectionChange: EventEmitter<ListItem> =
    new EventEmitter<ListItem>();

  public isDisabled: boolean = false;

  // Key of databinding for (ngModelChanges)
  public selectedOption$: BehaviorSubject<Option> = new BehaviorSubject(
    this.defaultOption
  );

  public selectedOption: Option = {} as Option;

  public writeValue(option: Option) {
    this.onSelect(option);
    this.selectedOption = option;
  }

  public registerOnChange(onChange: Function): void {
    this.selectedOption$.subscribe((selectedOption: Option) => {
      onChange(selectedOption);
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

  public onSelect(selectedOption: any): void {
    this.selectedOption$.next(selectedOption);
    this.onSelectionChange.emit(selectedOption);
  }

  public onFilterChange(listItem: ListItem): void {
    this.onSearch.emit(listItem);
  }
}
