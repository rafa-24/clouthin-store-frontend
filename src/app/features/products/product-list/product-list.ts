import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductFormModal } from '../product-form-modal/product-form-modal';
import { ProductService } from '../services/product';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductFormModal],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly isModalOpen = signal(false);

  ngOnInit(): void {
    this.loadProducts();
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.error.set('Error al cargar los productos');
        this.loading.set(false);
        console.error('Error al cargar los productos', err);
      },
    });
  }
}
