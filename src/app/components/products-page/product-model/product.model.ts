import { Category } from '../../shared/categories/category.model';
import { Rating } from './product.api';

export interface PriceRange {
  min: number;
  max: number;
}

export interface Product {
  id: number;
  name: string;
  categoryName: string;
  brandName: string;
  imageFile: string;
  subcategories: string[];
  priceRange: PriceRange;
  canHelp: string;
  packaging: string;
  numberOfRatings: number;
  avgRating: number;
  ratings: Rating[];
}
