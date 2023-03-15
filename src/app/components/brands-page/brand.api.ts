import { PriceCategoryOption } from '../shared/enums';

export interface BrandApiGetResponse {
  id: number;
  isCrueltyFree: boolean;
  isVegan: boolean;
  name: string;
  overallRating: number;
  priceCategoryId: number;
  imageFile: string;
  categoryId: number;
}

export interface BrandApiPostRequest {
  isCrueltyFree: boolean;
  isVegan: boolean;
  name: string;
  overallRating: number;
  priceCategoryId: number;
  imageFile: string;
  categoryId: number;
}

export interface BrandApiPutRequest {
  isCrueltyFree: boolean;
  isVegan: boolean;
  name: string;
  overallRating: number;
  priceCategoryId: number;
  imageFile: string;
  categoryId: number;
  id: number;
}
