import { ProductListItem } from '../../products-page/product-model/product.api';
import { Option } from '../../shared/single-select/option.model';
export interface Ingredient {
  id: number;
  name: string;
  categories: Option[];
  ewgRisk: number;
  comedogenIndex: number;
  irritationIndex: number;
  imageFile: string;
  functions: Option[];
  includedInProducts: ProductListItem[];
}
