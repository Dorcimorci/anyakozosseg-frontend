import { Option } from '../../shared/dropdown/dropdown.model';
import { Rating } from './product.api';

export interface PriceRange {
  min: number;
  max: number;
}

export interface Product {
  id: number;
  name: string;
  category: Option;
  brand: Option;
  imageFile: string;
  subcategories: Option[];
  ingredients: Option[];
  priceRange: PriceRange;
  canHelp: string;
  packaging: string;
  numberOfRatings: number;
  avgRating: number;
  ratings: Rating[];
  loggedInUsersRating?: Rating;
}
