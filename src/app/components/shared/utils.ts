export class Utils {
  public static mapBoolToHun(bool: boolean): string {
    return bool ? 'IGEN' : 'NEM';
  }
}

export const alphabetLetters: string[] = 'abcdefghijklmnopqrstuvwxyz'
  .toUpperCase()
  .split('');

export const routeToSingularTranslation: Record<string, string> = {
  brands: 'márka',
  ingredients: 'összetevő',
  products: 'termék',
};
