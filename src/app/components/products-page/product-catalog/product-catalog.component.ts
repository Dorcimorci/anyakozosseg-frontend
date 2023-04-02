import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PageAction } from '../../shared/enums';
import { RouterService } from '../../shared/router.service';
import { alphabetLetters } from '../../shared/utils';
import { ProductListItem } from '../product-model/product.api';
import { Product } from '../product-model/product.model';
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
    private readonly activatedRoute: ActivatedRoute,
    private readonly routerService: RouterService,
    private readonly router: Router
  ) {
    this.products$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        this.activeLetter = paramMap.get('abcLetter') ?? this.activeLetter;
        return this.productService.fetchProductsByFirstLetter(
          this.activeLetter
        );
      })
    );
    this.routerService.pageAction$.subscribe((pageAction: PageAction) => {
      this.pageAction = pageAction;
    });
  }

  public handleProductClick = (product: Product) => {
    if (this.pageAction === PageAction.Read) {
      this.router.navigate(['/products/details', product.id]);
    } else if (this.pageAction === PageAction.Update) {
      this.router.navigate(['/products/form', this.pageAction, product.id]);
    }
  };
}
