import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { BrandsPageComponent } from './components/brands-page/brands-page.component';
import { BrandCatalogComponent } from './components/brands-page/brand-catalog/brand-catalog.component';
import { BrandDetailsComponent } from './components/brands-page/brand-details/brand-details.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { BrandFormComponent } from './components/brands-page/brand-form/brand-form.component';
import { DropdownComponent } from './components/shared/dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './components/shared/rating/rating.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductCatalogComponent } from './components/products-page/product-catalog/product-catalog.component';
import { ProductListComponent } from './components/products-page/product-list/product-list.component';
import { ProductDetailsComponent } from './components/products-page/product-details/product-details.component';
import { ProductsByCategoryComponent } from './components/products-page/products-by-category/products-by-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomePageComponent,
    BrandsPageComponent,
    BrandCatalogComponent,
    BrandDetailsComponent,
    SidebarComponent,
    BrandFormComponent,
    DropdownComponent,
    RatingComponent,
    ProductsPageComponent,
    ProductCatalogComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductsByCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
  providers: [Location],
  bootstrap: [AppComponent],
})
export class AppModule {}
