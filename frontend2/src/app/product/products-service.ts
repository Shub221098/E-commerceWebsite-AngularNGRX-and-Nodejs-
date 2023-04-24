import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { root } from 'postcss';
import { map } from 'rxjs';
import { Products } from './products.model';
@Injectable()
export class ProductsService {
  product: Products[];
  constructor(private http: HttpClient) {}

  getProducts(order: number, filter = '', type = '') {
    let param;
    param =
      type == 'brand'
        ? { sort: 'discountPrice,' + order, brand: filter }
        : type== 'category' ? { sort: 'discountPrice,' + order, category: filter } : {sort: 'discountPrice,' + order};
    return this.http.get('http://localhost:3000/api/v1/products', {
      params: param,
    });
  }
  getProductsLastAdded(filter = '', type = '') {
    let param;
    param =
      type == 'brand'
        ? { sort: '-createdAt,-1', brand: filter }
        : { sort: '-createdAt,-1,', category: filter };
    return this.http.get('http://localhost:3000/api/v1/products', {
      params: param,
    });
  }
  getFilterProductsByCategory(order: string, sortOrder = 1) {
    return this.http.get('http://localhost:3000/api/v1/products', {
      params: { sort: sortOrder, category: order },
    });
  }
  getFilterProductsByBrand(order: string, sortOrder = 1) {
    return this.http.get('http://localhost:3000/api/v1/products', {
      params: { sort: sortOrder, brand: order },
    });
  }
  searchProduct(searchType: string, search: string) {
    let param;
    console.log(searchType);
    param =
      searchType == 'brand'
        ? { brand: search }
        : searchType == 'name'
        ? { name: search }
        : { category: search };
    return this.http.get('http://localhost:3000/api/v1/products', {
      params: param,
    });
  }
}
