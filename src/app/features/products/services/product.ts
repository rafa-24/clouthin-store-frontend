import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, ProductListResponse, ProductCreatePayload, ProductCreateResponse } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/products';

  getAll(): Observable<Product[]> {
    return this.http
      .get<ProductListResponse>(this.baseUrl)
      .pipe(map((response) => response.data));
  }

  create(payload: ProductCreatePayload): Observable<string> {
    return this.http.post<ProductCreateResponse>(this.baseUrl, payload)
      .pipe(map((response) => response.message));
  }
}
