import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ProductFormValue {
  name: string;
  description: string;
  price: number | null;
  stock: number | null;
  category: string;
  imageUrl: string;
  active: boolean;
}

@Component({
  selector: 'app-product-form-modal',
  imports: [FormsModule],
  templateUrl: './product-form-modal.html',
  styleUrl: './product-form-modal.css',
})
export class ProductFormModal {
  readonly close = output<void>();
  readonly saved = output<ProductFormValue>();

  readonly categories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros'];
  readonly placeholderImage = '/product-placeholder.png';

  form: ProductFormValue = {
    name: '',
    description: '',
    price: null,
    stock: null,
    category: '',
    imageUrl: '',
    active: true,
  };

  get previewImage(): string {
    return this.form.imageUrl.trim() || this.placeholderImage;
  }

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.saved.emit({
      ...this.form,
      imageUrl: this.form.imageUrl.trim() || this.placeholderImage,
    });
    this.close.emit();
  }
}
