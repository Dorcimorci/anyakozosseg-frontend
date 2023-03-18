import { Component, Input } from '@angular/core';
import { ProductListItem } from '../product-model/product.api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input() products: ProductListItem[] = [];
}
