import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge-icon',
  templateUrl: './badge-icon.component.html',
  styleUrls: ['./badge-icon.component.scss'],
})
export class BadgeIconComponent {
  @Input() numberToShow: number = 0;
  @Input() iconClass: string = 'fa fa-comment';
}
