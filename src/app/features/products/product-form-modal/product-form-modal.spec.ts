import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ProductFormModal } from './product-form-modal';

describe('ProductFormModal', () => {
  let component: ProductFormModal;
  let fixture: ComponentFixture<ProductFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormModal],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
