import { Component, Input } from '@angular/core';
import { BrandApiGetResponse } from '../brand-model/brand.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent {
  @Input() brandList: BrandApiGetResponse[] = [];
  @Input() onClick: Function = (brand: BrandApiGetResponse) =>
    this.router.navigate(['/brands/details', brand.id]);
  @Input() hoverIconClass: string = '';

  constructor(private readonly router: Router) {}
}
