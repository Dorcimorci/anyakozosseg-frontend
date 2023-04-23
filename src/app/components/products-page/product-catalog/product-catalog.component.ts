import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PageAction } from '../../shared/enums';
import { RouterService } from '../../shared/router.service';
import { alphabetLetters } from '../../shared/utils';
import { ProductListItem } from '../product-model/product.api';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';

/**
 * Component that displays an alphabetical catalog of products and handles user interactions based on the current PageAction.
 */
@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
})
export class ProductCatalogComponent implements OnInit {
  public products$: Observable<ProductListItem[]> | null = null;
  public alphabetLetters: string[] = alphabetLetters;
  public activeLetter: string = 'A';
  public hoverIconClass: string = '';

  public pageAction: PageAction = PageAction.Read;

  /**
   * Enum for page actions.
   */
  public get PageAction() {
    return PageAction;
  }

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly routerService: RouterService,
    private readonly router: Router
  ) {}

  /**
   * Initializes the component and subscribes to router and pageAction changes.
   */
  ngOnInit(): void {
    this.products$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        this.activeLetter = paramMap.get('abcLetter') ?? this.activeLetter;
        return this.productService.fetchProductsByFirstLetter(
          this.activeLetter
        );
      })
    );
    this.routerService.pageAction$.subscribe((pageAction: PageAction) => {
      if (pageAction === PageAction.Delete) {
        this.hoverIconClass = '\uf2ed';
      } else if (pageAction === PageAction.Update) {
        this.hoverIconClass = '\uf303';
      } else {
        this.hoverIconClass = '';
      }
      this.pageAction = pageAction;
    });
  }

  /**
   * Handles the click event of a product item and performs corresponding actions based on the current page action.
   * If the current page action is Read, navigates to product details page based on the id of the clicked product.
   * If the current page action is Update, navigates to product form page for updating the product based on the product id.
   * If the current page action is Delete, deletes the selected product and reloads the component.
   *
   * @param product The selected product.
   */
  public handleProductClick = (product: Product) => {
    if (this.pageAction === PageAction.Read) {
      this.router.navigate(['/products/details', product.id]);
    } else if (this.pageAction === PageAction.Update) {
      this.router.navigate(['/products/form', this.pageAction, product.id]);
    } else if (this.pageAction === PageAction.Delete) {
      this.productService
        .deleteProduct(product.id)
        .subscribe(() => this.ngOnInit());
    }
  };
}
