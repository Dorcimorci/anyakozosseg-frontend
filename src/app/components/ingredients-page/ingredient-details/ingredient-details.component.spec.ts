import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ingredientDetailsComponent} from './ingredient-details.component';

describe('ingredientDetailsComponent', () => {
  let component: ingredientDetailsComponent;
  let fixture: ComponentFixture<ingredientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ingredientDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ingredientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
