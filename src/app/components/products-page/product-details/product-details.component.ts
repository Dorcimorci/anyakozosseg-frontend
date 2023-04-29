import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { firstValueFrom, map, switchMap, tap } from 'rxjs';
import { Rating, RatingPostRequest } from '../product-model/product.api';
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
export class ProductDetailsComponent implements AfterViewInit {
  /**
   * QueryList to access all elements with a 'comment' template reference variable.
   */
  @ViewChildren('comment') commentElements!: QueryList<ElementRef>;

  public product: Product = {} as Product;
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
   * Angular lifecycle hook called after the component's view has been initialized.
   * It detects changes in the view and updates the product list with ellipsis flag.
   */
  public ngAfterViewInit(): void {
    const product$ = this.activatedRoute.paramMap.pipe(
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

    product$.subscribe((product: Product) => {
      this.product = product;
    });

    this.commentElements.changes.subscribe(() => {
      // Handle changes to commentElements
      this.commentElements.forEach((comment: ElementRef, i: number) => {
        this.product.ratings[i].isEllipsisActive =
          this.isCommentOverflowing(comment);
        console.log(this.isCommentOverflowing(comment));
        this.cd.detectChanges();
      });
    });
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
      this.refresh()
    );
  }

  /**
   * Edits a rating for a product.
   *
   * @param productId - The ID of the product whose rating needs to be edited.
   */
  public editRating(): void {
    firstValueFrom(this.ratingService.editRating(this.userRating)).then(() =>
      this.refresh()
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
   * Refreshes the product details and hides the rating form.
   *
   * @private
   * @param productId - The ID of the product to be refreshed.
   */
  private refresh(): void {
    this.ngAfterViewInit();
    this.showRatingForm = false;
  }

  /**
   * Checks if a comment element is overflowing vertically.
   * @param comment - The comment element reference to check for overflow.
   * @returns True if the comment is overflowing vertically, false otherwise.
   */
  public isCommentOverflowing(comment: ElementRef): boolean {
    return (
      comment.nativeElement.scrollHeight > comment.nativeElement.clientHeight
    );
  }

  /**
   * Toggles the "showFully" property of a rating object when the comment is clicked.
   * @param rating - The rating object to toggle.
   */
  public onCommentClick(rating: Rating): void {
    rating.showFully = !rating.showFully;
  }
}
