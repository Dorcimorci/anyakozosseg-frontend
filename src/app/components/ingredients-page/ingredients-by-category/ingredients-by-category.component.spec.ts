import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ingredientsByCategoryComponent} from './ingredients-by-category.component';

describe('ingredientsByCategoryComponent', () => {
  let component: ingredientsByCategoryComponent;
  let fixture: ComponentFixture<ingredientsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ingredientsByCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ingredientsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
