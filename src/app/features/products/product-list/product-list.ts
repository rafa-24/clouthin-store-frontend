import { Component } from '@angular/core';
import { ProductFormModal } from "../product-form-modal/product-form-modal";

type ProductStatus = 'Activo' | 'Inactivo';

interface MockProduct {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  status: ProductStatus;
}

@Component({
  selector: 'app-product-list',
  imports: [ProductFormModal],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  readonly products: MockProduct[] = [
    {
      name: 'Auriculares Inalámbricos Pro',
      description: 'Cancelación de ruido activa y 30h de batería',
      price: '189,99',
      category: 'Electrónica',
      stock: 42,
      status: 'Activo',
    },
    {
      name: 'Camiseta Oversize Algodón',
      description: '100% algodón orgánico, corte relajado',
      price: '29,50',
      category: 'Ropa',
      stock: 128,
      status: 'Activo',
    },
    {
      name: 'Lámpara de Escritorio LED',
      description: 'Intensidad regulable con puerto USB-C',
      price: '54,00',
      category: 'Hogar',
      stock: 0,
      status: 'Inactivo',
    },
    {
      name: 'Botella Térmica 750ml',
      description: 'Mantiene la temperatura hasta 24h',
      price: '24,90',
      category: 'Deportes',
      stock: 76,
      status: 'Activo',
    },
    {
      name: 'Teclado Mecánico Compacto',
      description: 'Switches lineales, retroiluminación RGB',
      price: '129,00',
      category: 'Electrónica',
      stock: 15,
      status: 'Activo',
    },
    {
      name: 'Set de Cuadernos Premium',
      description: 'Pack de 3 cuadernos tapa dura A5',
      price: '18,00',
      category: 'Libros',
      stock: 210,
      status: 'Inactivo',
    },
  ];

  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
