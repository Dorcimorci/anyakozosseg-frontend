import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PageAction } from '../../shared/enums';
import { alphabetLetters } from '../../shared/utils';
import { ProductListItem } from '../product-model/product.api';
import { ProductService } from '../product-service/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
})
export class ProductCatalogComponent {
  public products$: Observable<ProductListItem[]>;
  public alphabetLetters: string[] = alphabetLetters;
  public activeLetter: string = 'A';

  public pageAction: PageAction = PageAction.Read;
  public get PageAction() {
    return PageAction;
  }

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.products$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        this.activeLetter = paramMap.get('abcLetter') ?? this.activeLetter;
        return this.productService.fetchProductsByFirstLetter(
          this.activeLetter
        );
      })
    );
  }
}
