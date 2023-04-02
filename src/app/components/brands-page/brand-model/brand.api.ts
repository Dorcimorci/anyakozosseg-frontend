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

export interface BrandApiPutRequest extends BrandApiPostRequest {
  id: number;
}
