import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '../brand-model/brand.model';
import { PageAction } from '../../shared/enums';
import { BrandsService } from '../brands-service/brands.service';
import { firstValueFrom } from 'rxjs';

/**
 * Component for displaying a list of brands.
 */
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent {
  /**
   * Input property to pass the list of brands to display.
   */
  @Input() brandList: Brand[] = [];

  /**
   * Input property to specify the CSS class for hover icon.
   */
  @Input() hoverIconClass: string = '';

  /**
   * Input property to specify the page action (e.g., create, update, read).
   */
  @Input() pageAction: PageAction = PageAction.Read;

  /**
   * Output event emitter to emit event after a brand is deleted.
   */
  @Output() afterDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Enum representing possible page actions.
   */
  public get PageAction() {
    return PageAction;
  }

  constructor(private readonly brandService: BrandsService) {}

  /**
   * Handler for the onDelete event, triggered when a brand is deleted.
   * @param brandId - The ID of the brand to be deleted.
   * @returns A promise that resolves when the brand is deleted.
   */
  public async onDelete(brandId: number): Promise<void> {
    await firstValueFrom(this.brandService.deleteById(brandId));
    this.afterDelete.next(true);
  }
}
