import { PriceRange } from './product.model';

export interface Rating {
  id: number;
  username: string;
  rating: number;
  comment: string;
  addedOn: Date;
  showFully: boolean;
  isEllipsisActive: boolean;
}

export interface ProductListItem {
  id: number;
  name: string;
  avgRating: number;
  numberOfRatings: number;
  lastRating: Rating;
  imageFile: string;
}

export interface RatingPostRequest {
  userId: number;
  productId: number;
  rating: number;
  comment: string;
}

export interface ProductApiPostRequest {
  name: string;
  categoryId: number;
  brandId: number;
  imageFile: string;
  productCategories: string[];
  priceRange: PriceRange;
  canHelp: string;
  packaging: string;
  ratings: Rating[];
}

export interface ProductApiPutRequest extends ProductApiPostRequest {
  id: number;
}
