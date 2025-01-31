import { Option } from '../../shared/single-select/option.model';
export interface Brand {
  id: number;
  isCrueltyFree: Option;
  isVegan: Option;
  name: string;
  overallRating: number;
  numberOfRatings?: number;
  category: Option;
  priceCategory: Option;
  imageFile: string;
}
