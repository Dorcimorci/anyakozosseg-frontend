import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphabeticalBrandCatalogComponent } from './components/brands-page/alphabetical-brand-catalog/alphabetical-brand-catalog.component';
import { BrandDetailsComponent } from './components/brands-page/brand-details/brand-details.component';
import { BrandsPageComponent } from './components/brands-page/brands-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'brands',
    component: BrandsPageComponent,
  },
  {
    path: 'brands/alphabetical-brand-catalog/:categoryName/:abcLetter',
    component: AlphabeticalBrandCatalogComponent,
  },
  {
    path: 'brands/brand-details/:brandId',
    component: BrandDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
