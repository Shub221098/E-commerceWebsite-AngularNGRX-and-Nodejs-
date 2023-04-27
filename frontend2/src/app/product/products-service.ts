import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { root } from 'postcss';
import { map } from 'rxjs';
import { Products } from './products.model';
@Injectable()
export class ProductsService {
  product: Products[];
  constructor(private http: HttpClient) {}
  searchProduct(order: string, search: string) {
    if (order) {
      return this.http.get('@baseUrl/products/search', {
        params: { sort: 'discountPrice:' + order, q: search },
      });
    }
    else{
      return this.http.get('@baseUrl/products/search', {
        params: { sort: '-createdAt:' + 1, q: search },
      });
    }
  }
}
