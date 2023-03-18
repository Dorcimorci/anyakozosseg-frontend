import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductListItem } from '../product-model/product.api';
import { ProductService } from '../product-service/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
})
export class ProductCatalogComponent implements OnInit {
  public products: ProductListItem[] = [];
  public activeLetter: string = 'a';

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const abcLetter: string | null = paramMap.get('abcLetter');
      if (abcLetter) {
        this.activeLetter = abcLetter;
      }
    });
  }

  public ngOnInit(): void {
    this.productService
      .fetchProductsByFirstLetter(this.activeLetter)
      .subscribe((products: ProductListItem[]) => {
        this.products = products;
      });
  }
}
