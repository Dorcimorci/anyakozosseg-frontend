import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { RatingPostRequest } from '../product-model/product.api';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';
import { RatingService } from '../rating-service/rating.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  public product$: Observable<Product>;
  public showRatingForm: boolean = false;

  public newRating: RatingPostRequest = {
    rating: 0,
    userId: 1,
  } as RatingPostRequest;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private cd: ChangeDetectorRef
  ) {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('productId')),
      switchMap((productId: string | null) =>
        this.productService.fetchProductDetailsById(Number(productId))
      )
    );
  }

  public scrollToRatings(productContainer: HTMLElement): void {
    const offset = productContainer.offsetHeight;
    window.scroll({
      top: offset,
      behavior: 'smooth',
    });
  }

  public openRatingForm(): void {
    this.showRatingForm = true;
    this.cd.detectChanges();
  }

  public closeRatingForm(): void {
    this.showRatingForm = false;
    this.cd.detectChanges();
  }

  public submitRating(productId: number): void {
    this.newRating.productId = productId;

    this.ratingService
      .submitRating(this.newRating)
      .subscribe(() => this.refresh(productId));
  }

  public showDummyProduct(event: ErrorEvent): void {
    (event.target as HTMLImageElement).src =
      'assets/img/products/dummy_product.png';
  }

  public getSubcategoryNames(product: Product): string {
    return product.subcategories
      .map((subcategory) => subcategory.name.toUpperCase())
      .join(', ');
  }

  private refresh(productId: number): void {
    this.product$ = this.productService.fetchProductDetailsById(productId);
    this.showRatingForm = false;
  }
}
