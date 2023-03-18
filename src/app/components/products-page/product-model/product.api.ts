interface Rating {
  id: number;
  username: string;
  rating: number;
  comment: string;
  addedOn: Date;
}

export interface ProductListItem {
  id: number;
  name: string;
  avgRating: number;
  numberOfRatings: number;
  lastRating: Rating;
  imageFile: string;
}

export interface Product {
  id: number;
  name: string;
  imageFile: string;
  categoryName: string;
}
