import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductCreatePayload } from '../model/product.model';
import { ProductService } from '../services/product';

export interface ProductFormValue {
  name: string;
  category: string;
  price: number | null;
  stock: number | null;
  imageUrl: string;
}

@Component({
  selector: 'app-product-form-modal',
  imports: [FormsModule],
  templateUrl: './product-form-modal.html',
  styleUrl: './product-form-modal.css',
})
export class ProductFormModal implements OnInit {
  private readonly productService = inject(ProductService);

  readonly product = input<Product | null>(null);

  readonly close = output<void>();
  readonly saved = output<void>();

  readonly isEditMode = computed(() => !!this.product());

  readonly submitted = signal(false);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  form: ProductFormValue = {
    name: '',
    category: '',
    price: null,
    stock: null,
    imageUrl: '',
  };

  ngOnInit(): void {
    const product = this.product();
    if (!product) {
      return;
    }

    this.form = {
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      imageUrl: product.image,
    };
  }

  get previewImage(): string {
    return this.form.imageUrl.trim() || '/product-placeholder.png';
  }

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.submitted.set(true);
    this.submitError.set(null);

    if (!this.isFormValid()) {
      return;
    }

    const payload: ProductCreatePayload = {
      name: this.form.name.trim(),
      category: this.form.category.trim(),
      price: Number(this.form.price),
      stock: Number(this.form.stock),
      image: this.form.imageUrl.trim(),
    };

    this.submitting.set(true);

    const request$ = this.isEditMode()
      ? this.productService.update(this.product()!.id, payload)
      : this.productService.create(payload);

    request$.subscribe({
      next: () => {
        this.submitting.set(false);
        this.saved.emit();
        this.close.emit();
      },
      error: (err: unknown) => {
        console.error(
          this.isEditMode() ? 'Error al actualizar el producto' : 'Error al crear el producto',
          err,
        );
        this.submitting.set(false);
        this.submitError.set(this.getErrorMessage(err));
      },
    });
  }

  isFieldInvalid(field: keyof ProductFormValue): boolean {
    if (!this.submitted()) {
      return false;
    }

    const value = this.form[field];

    if (typeof value === 'string') {
      return value.trim().length === 0;
    }

    return value === null || value === undefined || Number.isNaN(Number(value));
  }

  private isFormValid(): boolean {
    return (
      this.form.name.trim().length > 0 &&
      this.form.category.trim().length > 0 &&
      this.form.imageUrl.trim().length > 0 &&
      this.form.price !== null &&
      this.form.price !== undefined &&
      !Number.isNaN(Number(this.form.price)) &&
      this.form.stock !== null &&
      this.form.stock !== undefined &&
      !Number.isNaN(Number(this.form.stock))
    );
  }

  private getErrorMessage(err: unknown): string {
    const fallback = this.isEditMode()
      ? 'No se pudo actualizar el producto. Intenta de nuevo.'
      : 'No se pudo crear el producto. Intenta de nuevo.';

    if (!(err instanceof HttpErrorResponse)) {
      return fallback;
    }

    const apiMessage = err.error?.message;

    if (Array.isArray(apiMessage) && apiMessage.length > 0) {
      return apiMessage.join('. ');
    }

    if (typeof apiMessage === 'string' && apiMessage.trim()) {
      return apiMessage;
    }

    return fallback;
  }
}
