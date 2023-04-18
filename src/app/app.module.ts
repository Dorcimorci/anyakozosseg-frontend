import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ProductFormComponent } from './components/products-page/product-form/product-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BadgeIconComponent } from './components/shared/badge-icon/badge-icon.component';
import { BrandsByCategoryComponent } from './components/brands-page/brands-by-category/brands-by-category.component';
import { BrandListComponent } from './components/brands-page/brand-list/brand-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegPageComponent } from './components/reg-page/reg-page.component';
import { SingleSelectComponent } from './components/shared/single-select/single-select.component';

import { IngredientCatalogComponent } from './components/ingredients-page/ingredient-catalog/ingredient-catalog.component';
import { IngredientDetailsComponent } from './components/ingredients-page/ingredient-details/ingredient-details.component';
import { IngredientFormComponent } from './components/ingredients-page/ingredient-form/ingredient-form.component';
import { IngredientListComponent } from './components/ingredients-page/ingredient-list/ingredient-list.component';
import { IngredientsByCategoryComponent } from './components/ingredients-page/ingredients-by-category/ingredients-by-category.component';
import { IngredientsPageComponent } from './components/ingredients-page/ingredients-page.component';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { SearchComponent } from './components/shared/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DropdownComponent,
    BadgeIconComponent,
    RatingComponent,
    SidebarComponent,
    WelcomePageComponent,
    BrandsPageComponent,
    BrandCatalogComponent,
    BrandDetailsComponent,
    BrandFormComponent,
    BrandsByCategoryComponent,
    BrandListComponent,
    IngredientsPageComponent,
    IngredientCatalogComponent,
    IngredientDetailsComponent,
    IngredientFormComponent,
    IngredientsByCategoryComponent,
    IngredientListComponent,
    ProductsPageComponent,
    ProductCatalogComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductsByCategoryComponent,
    ProductFormComponent,
    AboutUsComponent,
    LoginPageComponent,
    RegPageComponent,
    SingleSelectComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    Location,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
