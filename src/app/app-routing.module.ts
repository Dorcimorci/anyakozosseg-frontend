import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandCatalogComponent } from './components/brands-page/brand-catalog/brand-catalog.component';
import { BrandDetailsComponent } from './components/brands-page/brand-details/brand-details.component';
import { BrandFormComponent } from './components/brands-page/brand-form/brand-form.component';
import { BrandsPageComponent } from './components/brands-page/brands-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'brands/:action',
    component: BrandsPageComponent,
  },
  {
    path: 'brands/catalog/:action/:categoryName/:abcLetter',
    component: BrandCatalogComponent,
  },
  {
    path: 'brands/details/:action/:brandId',
    component: BrandDetailsComponent,
  },
  {
    path: 'brands/form/:action',
    component: BrandFormComponent,
  },
  {
    path: 'brands/form/:action/:brandId',
    component: BrandFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
