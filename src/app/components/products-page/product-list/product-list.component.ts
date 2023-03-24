import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { take } from 'rxjs';
import { ProductListItem, Rating } from '../product-model/product.api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements AfterViewInit {
  @ViewChildren('comment') commentElements!: QueryList<ElementRef>;

  @Input() products: ProductListItem[] = [];

  public showFullCommentBtnHovered: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.commentElements.changes.subscribe(() => {
      this.commentElements.forEach((comment: ElementRef, i: number) => {
        const commentText = comment.nativeElement.innerText;
        const isOverflowing =
          comment.nativeElement.scrollHeight >
          comment.nativeElement.clientHeight;
        this.products[i].lastRating.isEllipsisActive = isOverflowing;
        this.cd.detectChanges();
      });
    });
  }

  public isCommentOverflowing(comment: ElementRef): boolean {
    return (
      comment.nativeElement.scrollWidth > comment.nativeElement.clientWidth
    );
  }

  public onCommentClick(lastRating: Rating): void {
    lastRating.showFully = !lastRating.showFully;
  }
  public onMouseOver(): void {
    this.showFullCommentBtnHovered = true;
    console.log(this.showFullCommentBtnHovered);
  }

  public onMouseLeave(): void {
    this.showFullCommentBtnHovered = false;
    console.log(this.showFullCommentBtnHovered);
  }
}
