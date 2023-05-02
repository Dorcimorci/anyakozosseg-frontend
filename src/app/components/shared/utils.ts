import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Brand } from '../brands-page/brand-model/brand.model';
import { PageAction } from './enums';
import { Option } from './single-select/option.model';

/**
 * Utility class containing various helper methods.
 */
export class Utils {
  /**
   * Base dropdown settings used for ng-multiselect-dropdown.
   */
  public static baseDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    allowSearchFilter: false,
    searchPlaceholderText: 'Keresés',
    closeDropDownOnSelection: true,
    defaultOpen: false,
    noFilteredDataAvailablePlaceholderText:
      'Nincs a keresési feltételnek megfelelő találat',
    noDataAvailablePlaceholderText: 'Nincsenek elérhető listaelemek',
  };

  /**
   * Maps a boolean value to text representation.
   * @param bool - The boolean value to be mapped.
   * @returns The text representation of the boolean value.
   */
  public static mapBooleanToText(bool: boolean | string): string {
    return Boolean(bool) ? 'IGEN' : 'NEM';
  }

  /**
   * Maps brand boolean options to their text representation.
   * @param brand - The brand object to be mapped.
   * @returns The brand object with boolean options mapped to text representation.
   */
  public static mapBrandBooleanOptions(brand: Brand): Brand {
    return {
      ...brand,
      isCrueltyFree: {
        id: brand.isCrueltyFree.id,
        name: Utils.mapBooleanToText(brand.isCrueltyFree.name),
      },
      isVegan: {
        id: brand.isVegan.id,
        name: Utils.mapBooleanToText(brand.isVegan.name),
      },
    };
  }

  /**
   * Maps a page action enum value to its corresponding title segment.
   * @param pageAction - The page action enum value.
   * @returns The title segment mapped from the page action enum value.
   */
  public static mapPageActionToTitleSegment(pageAction: PageAction): string {
    switch (pageAction) {
      case PageAction.Create:
        return 'HOZZÁADÁSA';
      case PageAction.Update:
        return 'SZERKESZTÉSE';
      default:
        return '';
    }
  }

  /**
   * Validates and gets a file object, and invokes a callback function when the file is loaded.
   * @param file - The file object to be validated and loaded.
   * @param onLoadCallback - The callback function to be invoked when the file is loaded.
   */
  public static validateAndGetFile(
    file: File,
    onLoadCallback: (this: FileReader, ev: ProgressEvent<FileReader>) => any
  ): void {
    if (file.type.match(/image\/*/) == null) {
      console.error('Only images are supported.');
    } else {
      const reader = new FileReader();
      reader.onloadend = onLoadCallback;
      reader.readAsDataURL(file);
    }
  }
}

/**
 * Array of boolean options.
 */
export const booleanOptions: Option[] = [
  { id: 0, name: 'NEM' },
  { id: 1, name: 'IGEN' },
];

/**
 * Array of alphabet letters in uppercase.
 */
export const alphabetLetters: string[] = 'abcdefghijklmnopqrstuvwxyz'
  .toUpperCase()
  .split('');

/**
 * Translates route names to their corresponding singular form in Hungarian.
 */
export const routeToSingularTranslation: Record<string, string> = {
  brands: 'márka',
  ingredients: 'összetevő',
  products: 'termék',
};
