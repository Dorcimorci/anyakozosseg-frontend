import { Rating } from './product.api';

export interface Product {
  id: number;
  name: string;
  imageFile: string;
  productCategories: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  canHelp: string;
  packaging: string;
  numberOfRatings: number;
  avgRating: number;
  ratings: Rating[];
}
