import { Brand } from '../brands-page/brand-model/brand.model';
import { Option } from './dropdown/dropdown.model';
import { PageAction } from './enums';

export class Utils {
  public static getEmptyOption(): Option {
    return {} as Option;
  }

  public static mapBooleanToText(bool: boolean | string): string {
    return Boolean(bool) ? 'IGEN' : 'NEM';
  }

  public static mapTextToBoolean(boolHun: string): boolean {
    return boolHun === 'IGEN';
  }

  public static mapBrandBooleanOptions(brand: Brand): Brand {
    return {
      ...brand,
      isCrueltyFree: {
        id: brand.isCrueltyFree.id,
        name: Utils.mapBooleanToText(brand.isCrueltyFree.name),
      },
      isVegan: {
        id: brand.isCrueltyFree.id,
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
  { id: 1, name: 'IGEN' },
  { id: 2, name: 'NEM' },
];

export const alphabetLetters: string[] = 'abcdefghijklmnopqrstuvwxyz'
  .toUpperCase()
  .split('');

export const routeToSingularTranslation: Record<string, string> = {
  brands: 'márka',
  ingredients: 'összetevő',
  products: 'termék',
};
