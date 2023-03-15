import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabeticalBrandCatalogComponent } from './alphabetical-brand-catalog.component';

describe('AlphabeticalBrandCatalogComponent', () => {
  let component: AlphabeticalBrandCatalogComponent;
  let fixture: ComponentFixture<AlphabeticalBrandCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphabeticalBrandCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabeticalBrandCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
