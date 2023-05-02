import { Component, Input } from '@angular/core';

/**
 * Represents a badge icon component.
 */
@Component({
  selector: 'app-badge-icon',
  templateUrl: './badge-icon.component.html',
  styleUrls: ['./badge-icon.component.scss'],
})
export class BadgeIconComponent {
  /**
   * The number to display in the badge.
   */
  @Input() numberToShow: number = 0;

  /**
   * The icon class for the badge icon.
   */
  @Input() iconClass: string = 'fa fa-comment';

  /**
   * The border color for the badge.
   */
  @Input() borderColor: string = 'white';
}
