import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ingredientsPageComponent } from './ingredients-page.component';

describe('ingredientsPageComponent', () => {
  let component: ingredientsPageComponent;
  let fixture: ComponentFixture<ingredientsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ingredientsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ingredientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
