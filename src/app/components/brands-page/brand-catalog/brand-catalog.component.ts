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
  // Array of alphabet letters for display in the UI
  public alphabetLetters: string[] = alphabetLetters;

  // The currently active alphabet letter
  public activeLetter: string = 'a';

  // The current page action for the brand catalog page
  public pageAction: PageAction = PageAction.Read;

  // Enum getter for PageAction enum to be used in the template
  public get PageAction() {
    return PageAction;
  }

  // Array of Brand objects to store the list of brands fetched from the service
  public brandList: Brand[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService
  ) {}

  /**
   * Angular lifecycle hook that is called after the component has been initialized
   */
  public ngOnInit(): void {
    // Fetches the route parameters and uses them to fetch brands from the service
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          // Get the active alphabet letter from the route parameters or use the default value
          this.activeLetter = paramMap.get('abcLetter') ?? this.activeLetter;

          // Get the page action from the route parameters or set it to Read by default
          this.pageAction =
            (paramMap.get('action') as PageAction) || PageAction.Read;

          // Fetch the brands from the service based on the active alphabet letter
          return this.brandsService.fetchBrandsByLetter(this.activeLetter);
        })
      )
      .subscribe((brands: Brand[]) => {
        // Assign the fetched brands to the brandList property
        this.brandList = brands;
      });
  }
}
