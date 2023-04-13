import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Brand } from '../brands-page/brand-model/brand.model';
import { Option } from './dropdown/dropdown.model';
import { PageAction } from './enums';

export class Utils {
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

  public static getEmptyOption(): Option {
    return {} as Option;
  }

  public static mapBooleanToText(bool: boolean | string): string {
    return Boolean(bool) ? 'IGEN' : 'NEM';
  }

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

  public static removeAccents(textWithAccents: string): string {
    return textWithAccents.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

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

export const booleanOptions: Option[] = [
  { id: 0, name: 'NEM' },
  { id: 1, name: 'IGEN' },
];

export const alphabetLetters: string[] = 'abcdefghijklmnopqrstuvwxyz'
  .toUpperCase()
  .split('');

export const routeToSingularTranslation: Record<string, string> = {
  brands: 'márka',
  ingredients: 'összetevő',
  products: 'termék',
};
