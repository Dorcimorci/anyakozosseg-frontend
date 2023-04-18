import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '../brand-model/brand.model';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent {
  @Input() brandList: Brand[] = [];
  @Input() onClick: Function = (brand: Brand) =>
    this.router.navigate(['/brands/details', brand.id]);
  @Input() hoverIconClass: string = '';

  constructor(private readonly router: Router) {}
}
