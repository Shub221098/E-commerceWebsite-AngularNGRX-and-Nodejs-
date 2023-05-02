import { setLoadingSpinner } from './../../shared/store/shared.action';
import * as ShoppingCartActions from 'src/app/shop/store/shopping-list.action';
import { OrderItem } from './../shop.model';
import { Products } from '../../product/products.model';
// import { AddIngredients } from '../store/shopping-list.action';
import { Subscription } from 'rxjs';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
// import * as ShoppingCartActions from '../store/shopping-list.action';
// import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducer';
import { getEmail, getName } from 'src/app/auth/store/auth.selector';
import { Input } from 'postcss';
@Component({
  selector: 'app-shopping-cart-container',
  templateUrl: './shopping-cart-container.component.html',
})
export class ShoppingCartContainerComponent implements OnInit, OnDestroy {
  cart: OrderItem[] | null;
  userSub: Subscription;
  totalPrice: number =0;
  totalDiscountPrice: number=0
  totalQuantity: number=0
  totalItems: number=0;
  discount : number;
  itemsId :string
  email : string
  name: string
  shopSub  :Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.shopSub = this.store.select('shop').subscribe((shop) => {
      this.cart = shop.cart;
      if(this.cart.length === 0){
        this.cart = null
      }
      else{
      this.calculateTotals()
      }
    });
  }
  calculateTotals() {
    this.totalPrice = 0;
    this.totalDiscountPrice = 0;
    this.totalQuantity = 0;
    this.totalItems = 0;
    if(this.cart){
    for (let item of this.cart) {
      this.totalQuantity += item.totalProductQuantity;
      this.totalPrice += item.totalProductPrice  * item.totalProductQuantity;
      this.totalDiscountPrice += item.totalProductDiscountPrice  * item.totalProductQuantity;
      this.totalItems++;
    }
    this.discount = this.totalPrice - this.totalDiscountPrice;
  }
  }
  removeItem(item: OrderItem) {
    this.store.dispatch(new ShoppingCartActions.RemoveProductFromCart(item.productId))
  }
  checkout() {
    if(this.cart){
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(new ShoppingCartActions.CartCheckout({items :this.cart, totalPrice : this.totalDiscountPrice, totalQuantity: this.totalQuantity, totalItems: this.totalItems}))
    }
  }
  ngOnDestroy(){
    this.shopSub.unsubscribe();
  }
}
