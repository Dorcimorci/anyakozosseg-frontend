import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductListItem, Rating } from '../product-model/product.api';
import { combineLatest } from 'rxjs';

/**
 * Represents a component that displays a list of products.
 */
@Component({
  selector: 'app-product-list', // Component selector used for HTML template
  templateUrl: './product-list.component.html', // HTML template file for the component
  styleUrls: ['./product-list.component.scss'], // Array of CSS files for styling the component
})
export class ProductListComponent implements AfterViewInit {
  /**
   * QueryList to access all elements with a 'comment' template reference variable.
   */
  @ViewChildren('comment') commentElements!: QueryList<ElementRef>;

  /**
   * Input property to pass an array of products to the component.
   */
  @Input() products: ProductListItem[] = [];

  /**
   * Input property to pass a click handler function for product items.
   */
  @Input() onClick: Function = (product: ProductListItem) =>
    this.router.navigate(['/products/details', product.id]);

  /**
   * Input property to pass a CSS class for hover icons.
   */
  @Input() hoverIconClass: string = '';

  /**
   * Flag to track if the "show fully" comment button is hovered.
   */
  public showFullCommentBtnHovered: boolean = false;

  constructor(private cd: ChangeDetectorRef, private readonly router: Router) {}

  /**
   * Angular lifecycle hook called after the component's view has been initialized.
   * It detects changes in the view and updates the product list with ellipsis flag.
   */
  public ngAfterViewInit(): void {
    this.commentElements.changes.subscribe(() => {
      this.commentElements.forEach((comment: ElementRef, i: number) => {
        if (this.products[i].lastRating) {
          this.products[i].lastRating.isEllipsisActive =
            this.isCommentOverflowing(comment);
          this.cd.detectChanges();
        }
      });
    });
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
   * @param lastRating - The rating object to toggle.
   */
  public onCommentClick(lastRating: Rating): void {
    lastRating.showFully = !lastRating.showFully;
  }

  /**
   * Sets the "showFullCommentBtnHovered" property to true when the mouse is over the component.
   */
  public onMouseOver(): void {
    this.showFullCommentBtnHovered = true;
  }

  /**
   * Sets the "showFullCommentBtnHovered" property to false when the mouse leaves the component.
   */
  public onMouseLeave(): void {
    this.showFullCommentBtnHovered = false;
  }

  /**
   * Replaces the source of an image with a dummy product image when an error occurs during loading.
   * @param event - The error event that occurred during image loading.
   */
  public showDummyProduct(event: ErrorEvent): void {
    (event.target as HTMLImageElement).src =
      'assets/img/products/dummy_product.png';
  }
}
