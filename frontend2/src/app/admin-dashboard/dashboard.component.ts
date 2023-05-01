import { ActivatedRoute } from '@angular/router';
import * as fromApp from './../store/app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalDailySales : number
  totalMonthlySales : number
  totalYearlySales : number
  totalPrice : number = 0
  users : any
  totalOrders: number
  mostSellProducts : any
  leastSellProducts : any
  constructor(
    private dashboardService : DashboardService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log("dashboard")
    this.totalDailySales = 0
    this.totalMonthlySales = 0
    this.totalYearlySales = 0
    this.dashboardService.getDailySales().subscribe((sales: any) => {
      for(let i = 0; i < sales.length; i++) {
      this.totalDailySales = this.totalDailySales + sales[i].total
      }
    })
    this.dashboardService.getMonthlySales().subscribe((sales: any) => {
      for(let i = 0; i < sales.length; i++) {
        console.log("bybybyb",sales[i].total)
      this.totalMonthlySales = this.totalMonthlySales + sales[i].total;
      console.log("see you", this.totalMonthlySales)
      }
    })
    this.dashboardService.getYearlySales().subscribe((sales: any) => {
      for(let i = 0; i < sales.length; i++) {
      this.totalYearlySales = this.totalYearlySales + sales[i].total
      }
    })
    this.dashboardService.getMostSellUsers().subscribe((users: any) =>{
      this.users = users
    })
    this.dashboardService.getMostSellProducts().subscribe((products: any) =>
    {
      this.mostSellProducts = products
    })
    this.dashboardService.getTotalOrders().subscribe((orders: any) =>
    {
      this.totalOrders = orders[0].totalOrders
      console.log(this.totalOrders)
    })
  }
}