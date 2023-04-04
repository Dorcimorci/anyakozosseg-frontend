import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsByCategoryComponent } from './brands-by-category.component';

describe('BrandsByCategoryComponent', () => {
  let component: BrandsByCategoryComponent;
  let fixture: ComponentFixture<BrandsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsByCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
