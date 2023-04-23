import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, firstValueFrom, map, switchMap, tap } from 'rxjs';
import { RatingPostRequest } from '../product-model/product.api';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product-service/product.service';
import { RatingService } from '../rating-service/rating.service';
import { User } from '../../shared/user-model/user.model';
import { UserService } from '../../shared/user-service/user.service';

/**
 * Component for displaying product details page.
 */
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  public product$: Observable<Product>; // Observable for product details
  public showRatingForm: boolean = false; // Flag to control visibility of rating form

  public userRating: RatingPostRequest = {} as RatingPostRequest; // User's rating for the product
  public user: User = {} as User; // Currently logged in user

  /**
   * Constructor for ProductDetailsComponent.
   *
   * @param activatedRoute - ActivatedRoute for accessing route parameters
   * @param productService - ProductService for fetching product details
   * @param ratingService - RatingService for submitting and editing ratings
   * @param userService - UserService for accessing logged in user information
   * @param cd - ChangeDetectorRef for manually triggering change detection
   */
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly userService: UserService,
    private readonly cd: ChangeDetectorRef
  ) {
    // Fetch product details from service based on productId parameter
    this.product$ = this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('productId')),
      switchMap((productId: string | null) =>
        this.productService.fetchProductDetailsById(Number(productId)).pipe(
          tap((product: Product) => {
            const rating = product.loggedInUsersRating?.rating;
            const comment = product.loggedInUsersRating?.comment;
            this.userRating = {
              rating: rating !== undefined ? rating : null,
              comment: comment !== undefined ? comment : null,
              productId: product.id,
            } as RatingPostRequest;
          })
        )
      )
    );

    // Subscribe to loggedInUser$ in UserService to get logged in user information
    this.userService.loggedInUser$.subscribe(
      (user: User) => (this.user = user)
    );

    // Initialize user object with data from localStorage
    this.user = {
      id: Number(localStorage.getItem('userId')),
      username: localStorage.getItem('username'),
      role: localStorage.getItem('userRole'),
    } as User;
  }

  /**
   * Scrolls to the ratings section of the product details page.
   *
   * @param productContainer - HTMLElement of the product details container
   */
  public scrollToRatings(productContainer: HTMLElement): void {
    const offset = productContainer.offsetHeight;
    window.scroll({
      top: offset,
      behavior: 'smooth',
    });
  }

  /**
   * Opens the rating form.
   */
  public openRatingForm(): void {
    this.showRatingForm = true;
    this.cd.detectChanges();
  }

  /**
   * Closes the rating form.
   */
  public closeRatingForm(): void {
    this.showRatingForm = false;
    this.cd.detectChanges();
  }

  /**
   * Submits a rating for a product.
   *
   * @param productId - The ID of the product to be rated.
   */
  public submitRating(productId: number): void {
    this.userRating.productId = productId;

    firstValueFrom(this.ratingService.submitRating(this.userRating)).then(() =>
      this.refresh(productId)
    );
  }

  /**
   * Edits a rating for a product.
   *
   * @param productId - The ID of the product whose rating needs to be edited.
   */
  public editRating(productId: number): void {
    firstValueFrom(this.ratingService.editRating(this.userRating)).then(() =>
      this.refresh(productId)
    );
  }

  /**
   * Displays a dummy product image when an error occurs while loading the product image.
   *
   * @param event - The error event triggered while loading the product image.
   */
  public showDummyProduct(event: ErrorEvent): void {
    (event.target as HTMLImageElement).src =
      'assets/img/products/dummy_product.png';
  }

  /**
   * Retrieves the names of subcategories associated with a product and returns them as a comma-separated string in uppercase.
   *
   * @param product - The product for which to retrieve subcategory names.
   * @returns A comma-separated string of subcategory names in uppercase.
   */
  public getSubcategoryNames(product: Product): string {
    return product.subcategories
      .map((subcategory) => subcategory.name.toUpperCase())
      .join(', ');
  }

  /**
   * Refreshes the product details and hides the rating form.
   *
   * @private
   * @param productId - The ID of the product to be refreshed.
   */
  private refresh(productId: number): void {
    this.product$ = this.productService.fetchProductDetailsById(productId);
    this.showRatingForm = false;
  }
}
