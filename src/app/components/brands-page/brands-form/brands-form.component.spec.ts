import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsFormComponent } from './brands-form.component';

describe('BrandsFormComponent', () => {
  let component: BrandsFormComponent;
  let fixture: ComponentFixture<BrandsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
