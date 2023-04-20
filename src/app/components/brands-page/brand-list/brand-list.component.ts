import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '../brand-model/brand.model';
import { PageAction } from '../../shared/enums';
import { BrandsService } from '../brands-service/brands.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent {
  @Input() brandList: Brand[] = [];
  @Input() hoverIconClass: string = '';
  @Input() pageAction: PageAction = PageAction.Read;

  @Output() afterDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get PageAction() {
    return PageAction;
  }

  constructor(private readonly brandService: BrandsService) {}

  public async onDelete(brandId: number): Promise<void> {
    await firstValueFrom(this.brandService.deleteById(brandId));
    this.afterDelete.next(true);
  }
}
