import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}
  getDailySales(){
    return this.http.get('@baseUrl/orders/getDailyIncome');
  }
  getMonthlySales(){
    return this.http.get('@baseUrl/orders/getMonthlyIncome');
  }
  getYearlySales(){
    return this.http.get('@baseUrl/orders/getYearlyIncome');
  }
  getMostSellUsers(){
    return this.http.get('@baseUrl/orders/getMostSellUsers');
  }
  getMostSellProducts(){
    return this.http.get('@baseUrl/orders/getProductHaveMostSell');
  }
  getTotalOrders() {
    return this.http.get('@baseUrl/orders/getTotalOrders')
  }
}