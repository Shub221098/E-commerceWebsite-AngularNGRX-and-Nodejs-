import { Products } from './../products.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs';
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

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .select('products')
      .pipe(map((productsState) => productsState.products))
      .subscribe((product: Products[]) => {
        this.products = product;
      });
  }

  onAddProduct(){
    
  }
}
