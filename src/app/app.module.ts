import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { BrandsPageComponent } from './components/brands-page/brands-page.component';
import { AlphabeticalBrandCatalogComponent } from './components/brands-page/alphabetical-brand-catalog/alphabetical-brand-catalog.component';
import { BrandDetailsComponent } from './components/brands-page/brand-details/brand-details.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { BrandsFormComponent } from './components/brands-page/brands-form/brands-form.component';
import { DropdownComponent } from './components/shared/dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './components/shared/rating/rating.component';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomePageComponent,
    BrandsPageComponent,
    AlphabeticalBrandCatalogComponent,
    BrandDetailsComponent,
    SidebarComponent,
    BrandsFormComponent,
    DropdownComponent,
    RatingComponent,
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
