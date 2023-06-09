import { OrdersService } from './order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '.././store/app.reducer';
import { Orders } from './order.model';
@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrdersComponent {
  orders: any;
  constructor(private orderService: OrdersService) {}
  ngOnInit() {
    this.orderService.getOrders().subscribe((order) => (this.orders = order));
  }
}
