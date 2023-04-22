import * as ProductActions from './../store/products.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../products.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as ShoppingListActions from 'src/app/shop/store/shopping-list.action';
import { OrderItem } from 'src/app/shop/shop.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Products;
  id: string;
  cart : OrderItem[]
  value : number = 1
  productForm = FormGroup
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
          console.log(this.product)
        }
      });
      this.store.select('shop').pipe(map((shopState) => shopState)).subscribe((cart) => console.log(cart))
  }
  onDecrementCartItem() {
  this.store.dispatch(new ProductActions.RemoveQuantity(this.product.id));
  }
  onIncrementCartItem() {
  this.store.dispatch(new ProductActions.AddQuantity(this.product.id));
  }
  onAddProductToCart(): void {
    if(!this.product.active){
      alert("This product is not available for purchasing")
    }
    this.store.dispatch(new ShoppingListActions.AddProductToCart(this.product));
  }
}
