import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PageAction } from '../../shared/enums';
import { alphabetLetters } from '../../shared/utils';
import { BrandsService } from '../brands-service/brands.service';
import { Brand } from '../brand-model/brand.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-alphabetical-brand-catalog',
  templateUrl: './brand-catalog.component.html',
  styleUrls: ['./brand-catalog.component.scss'],
})
export class BrandCatalogComponent implements OnInit {
  public alphabetLetters: string[] = alphabetLetters;
  public activeLetter: string = 'a';

  public pageAction: PageAction = PageAction.Read;
  public get PageAction() {
    return PageAction;
  }

  public brandList: Brand[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          this.activeLetter = paramMap.get('abcLetter') ?? this.activeLetter;
          this.pageAction = paramMap.get('action') as PageAction;
          return this.brandsService.fetchBrandsByLetter(this.activeLetter);
        })
      )
      .subscribe((brands: Brand[]) => {
        this.brandList = brands;
      });
  }

  public onDelete(brandId: number): void {
    this.brandsService.deleteById(brandId).subscribe(() => {
      this.ngOnInit();
    });
  }
}
