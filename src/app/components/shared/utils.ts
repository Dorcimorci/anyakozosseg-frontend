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
