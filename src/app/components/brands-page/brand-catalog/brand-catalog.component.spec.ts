import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCatalogComponent } from './brand-catalog.component';

describe('AlphabeticalBrandCatalogComponent', () => {
  let component: BrandCatalogComponent;
  let fixture: ComponentFixture<BrandCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
