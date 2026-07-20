export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
}