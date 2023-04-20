import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { RatingPostRequest } from '../product-model/product.api';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';
import { RatingService } from '../rating-service/rating.service';
import { User } from '../../shared/user-model/user.model';
import { UserService } from '../../shared/user-service/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  public product$: Observable<Product>;
  public showRatingForm: boolean = false;

  public userRating: RatingPostRequest = {} as RatingPostRequest;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly userService: UserService,
    private readonly cd: ChangeDetectorRef
  ) {
    const productId: number =
      +this.activatedRoute.snapshot.paramMap.get('productId')!;
    this.product$ = this.productService.fetchProductDetailsById(productId).pipe(
      tap((product: Product) => {
        const rating = product.loggedInUsersRating?.rating;
        const comment = product.loggedInUsersRating?.comment;

        this.userRating = {
          rating: rating !== undefined ? rating : null,
          comment: comment !== undefined ? comment : null,
          productId: product.id,
        } as RatingPostRequest;
      })
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
    this.userRating.productId = productId;

    firstValueFrom(this.ratingService.submitRating(this.userRating)).then(() =>
      this.refresh(productId)
    );
  }

  public editRating(productId: number): void {
    firstValueFrom(this.ratingService.editRating(this.userRating)).then(() =>
      this.refresh(productId)
    );
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
    console.log('refresh');
    this.product$ = this.productService.fetchProductDetailsById(productId);
    this.showRatingForm = false;
  }
}
