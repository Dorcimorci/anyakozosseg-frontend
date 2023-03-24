import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from '../../shared/navbar/navbar.service';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  public product$: Observable<Product>;

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly navbarService: NavbarService
  ) {
    const productId: number =
      +this.activatedRoute.snapshot.paramMap.get('productId')!;
    this.product$ = this.productService.fetchProductDetailsById(productId);
  }

  public scrollToRatings(productContainer: HTMLElement): void {
    const offset = productContainer.offsetHeight;
    window.scroll({
      top: offset,
      behavior: 'smooth',
    });
  }
}
