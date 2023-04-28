import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { root } from 'postcss';
import { map } from 'rxjs';
@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}
  getOrders(){
    return this.http.get('@baseUrl/orders')
  }
}
