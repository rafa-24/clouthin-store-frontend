import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product, ProductListResponse, ProductCreatePayload, ProductCreateResponse } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/products`;

  getAll(): Observable<Product[]> {
    return this.http
      .get<ProductListResponse>(this.baseUrl)
      .pipe(map((response) => response.data));
  }

  create(payload: ProductCreatePayload): Observable<string> {
    return this.http.post<ProductCreateResponse>(this.baseUrl, payload)
      .pipe(map((response) => response.message));
  }

  update(id: string, payload: ProductCreatePayload): Observable<string> {
    return this.http
      .patch<ProductCreateResponse>(`${this.baseUrl}/${id}`, payload)
      .pipe(map((response) => response.message));
  }
}
