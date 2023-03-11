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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomePageComponent,
    BrandsPageComponent,
    AlphabeticalBrandCatalogComponent,
    BrandDetailsComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
