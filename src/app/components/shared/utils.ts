import { PageAction } from './enums';

export class Utils {
  public static mapBooleanToText(bool: boolean): string {
    return bool ? 'IGEN' : 'NEM';
  }

  public static mapTextToBoolean(boolHun: string): boolean {
    return boolHun === 'IGEN';
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

export const booleanOptions: string[] = ['IGEN', 'NEM'];

export const alphabetLetters: string[] = 'abcdefghijklmnopqrstuvwxyz'
  .toUpperCase()
  .split('');

export const routeToSingularTranslation: Record<string, string> = {
  brands: 'márka',
  ingredients: 'összetevő',
  products: 'termék',
};
