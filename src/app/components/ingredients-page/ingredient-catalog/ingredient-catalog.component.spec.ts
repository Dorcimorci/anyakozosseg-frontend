import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ingredientCatalogComponent} from './ingredient-catalog.component';

describe('AlphabeticalingredientCatalogComponent', () => {
  let component: ingredientCatalogComponent;
  let fixture: ComponentFixture<ingredientCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ingredientCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ingredientCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
