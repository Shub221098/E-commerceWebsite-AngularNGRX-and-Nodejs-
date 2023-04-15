import { getAuthenticate, getRole } from './../../auth/store/auth.selector';
import { Products } from './../products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
// // import {brandPurePipe} from '../../core/pure-pipes/brand.pure.pipe';
// // import {orderByPricePurePipe} from '../../core/pure-pipes/order-by-price.pure.pipe';
// // import {Order} from '../../core/enums/order';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Products[];
  userSub: Subscription;
  productSub: Subscription;
  admin: boolean;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.userSub = this.store
      .select(getRole)
      .subscribe((role) => {
        if (role === 'admin') {
          console.log(role)
            this.admin = true;
          }
        }),
    this.store
      .select('products')
      .pipe(map((productsState) => productsState.products))
      .subscribe((product: Products[]) => {
        this.products = product;
      });
  }
}
