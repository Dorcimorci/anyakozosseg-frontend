import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ingredientListComponent} from './ingredient-list.component';

describe('ingredientListComponent', () => {
  let component: ingredientListComponent;
  let fixture: ComponentFixture<ingredientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ingredientListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ingredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
