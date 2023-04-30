import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandCatalogComponent } from './components/brands-page/brand-catalog/brand-catalog.component';
import { BrandDetailsComponent } from './components/brands-page/brand-details/brand-details.component';
import { BrandFormComponent } from './components/brands-page/brand-form/brand-form.component';
import { BrandsPageComponent } from './components/brands-page/brands-page.component';
import { ProductCatalogComponent } from './components/products-page/product-catalog/product-catalog.component';
import { ProductDetailsComponent } from './components/products-page/product-details/product-details.component';
import { ProductFormComponent } from './components/products-page/product-form/product-form.component';
import { ProductsByCategoryComponent } from './components/products-page/products-by-category/products-by-category.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BrandsByCategoryComponent } from './components/brands-page/brands-by-category/brands-by-category.component';
import { IngredientCatalogComponent } from './components/ingredients-page/ingredient-catalog/ingredient-catalog.component';
import { IngredientDetailsComponent } from './components/ingredients-page/ingredient-details/ingredient-details.component';
import { IngredientFormComponent } from './components/ingredients-page/ingredient-form/ingredient-form.component';
import { IngredientsByCategoryComponent } from './components/ingredients-page/ingredients-by-category/ingredients-by-category.component';
import { IngredientsPageComponent } from './components/ingredients-page/ingredients-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegPageComponent } from './components/reg-page/reg-page.component';
import { GuidePageComponent } from './components/guide-page/guide-page.component';

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
    path: 'brands/:action',
    component: BrandsPageComponent,
  },
  {
    path: 'brands/catalog/:action/:abcLetter',
    component: BrandCatalogComponent,
  },
  {
    path: 'brands/category/:categoryId',
    component: BrandsByCategoryComponent,
  },
  {
    path: 'brands/details/:brandId',
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
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'products/category/:categoryId',
    component: ProductsByCategoryComponent,
  },
  {
    path: 'products/catalog/:action/:abcLetter',
    component: ProductCatalogComponent,
  },
  {
    path: 'products/details/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'products/form/:action',
    component: ProductFormComponent,
  },
  {
    path: 'products/form/:action/:productId',
    component: ProductFormComponent,
  },
  {
    path: 'ingredients',
    component: IngredientsPageComponent,
  },
  {
    path: 'ingredients/:action',
    component: IngredientsPageComponent,
  },
  {
    path: 'ingredients/catalog/:action/:abcLetter',
    component: IngredientCatalogComponent,
  },
  {
    path: 'ingredients/category/:categoryId',
    component: IngredientsByCategoryComponent,
  },
  {
    path: 'ingredients/details/:ingredientId',
    component: IngredientDetailsComponent,
  },
  {
    path: 'ingredients/form/:action',
    component: IngredientFormComponent,
  },
  {
    path: 'ingredients/form/:action/:ingredientId',
    component: IngredientFormComponent,
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'login/:userId',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegPageComponent,
  },
  {
    path: 'guide',
    component: GuidePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
