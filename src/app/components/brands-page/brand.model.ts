import { PriceCategoryOption } from '../shared/enums';

export interface Brand {
  id: number;
  isCrueltyFree: string;
  isVegan: string;
  name: string;
  overallRating: number;
  priceCategory: PriceCategoryOption;
  imageFile: string;
  category: string;
}
