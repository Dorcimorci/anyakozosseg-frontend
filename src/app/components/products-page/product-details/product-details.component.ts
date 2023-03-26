import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NavbarService } from '../../shared/navbar/navbar.service';
import { Rating, RatingPostRequest } from '../product-model/product.api';
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
    userId: 2,
  } as RatingPostRequest;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private cd: ChangeDetectorRef
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
    (event.target as HTMLImageElement).src = 'assets/dummy_product.png';
  }

  private refresh(productId: number): void {
    this.product$ = this.productService.fetchProductDetailsById(productId);
    this.showRatingForm = false;
  }
}
