import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../products.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
// import { AddProductToCart } from '../../store/shop/shop.action';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Products;
  id: string;
  constructor(private store: Store<fromApp.AppState>, private router : Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('products');
        }),
        map((productsState) =>
          productsState.products.find((product) => {
            return product.id === this.id;
          })
        )
      )
      .subscribe((product) => {
        if (product !== undefined) {
          this.product = product;
        }
      });
      console.log(this.product);
  }

  onAddProductToCart(): void {
    // this.store.dispatch(new AddProductToCart(this.product));
  }
}
