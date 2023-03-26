import { Category } from '../../shared/categories/category.model';
import { PriceCategoryOption } from '../../shared/enums';

export interface Brand {
  id: number;
  isCrueltyFree: string;
  isVegan: string;
  name: string;
  overallRating: number;
  priceCategory: PriceCategoryOption;
  imageFile: string;
  categoryName?: string;
}

export interface MinimalBrand {
  id: number;
  name: string;
}
