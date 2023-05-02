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
  productId: number;
  rating: number;
  comment: string;
}
