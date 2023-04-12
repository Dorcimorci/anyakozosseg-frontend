import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ingredientFormComponent} from './ingredient-form.component';

describe('ingredientsFormComponent', () => {
  let component: ingredientFormComponent;
  let fixture: ComponentFixture<ingredientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ingredientFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ingredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
