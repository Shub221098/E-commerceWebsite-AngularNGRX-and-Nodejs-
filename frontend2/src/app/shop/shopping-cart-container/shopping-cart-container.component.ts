import * as ShoppingListActions from 'src/app/shop/store/shopping-list.action';
import { OrderItem } from './../shop.model';
import { Products } from '../../product/products.model';
// import { AddIngredients } from '../store/shopping-list.action';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
// import * as ShoppingListActions from '../store/shopping-list.action';
// import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducer';
import { Shop } from '../shop.model';
@Component({
  selector: 'app-shopping-cart-container',
  templateUrl: './shopping-cart-container.component.html',
})
export class ShoppingCartContainerComponent implements OnInit {
  cartItems: OrderItem[];
  cart: Shop[];
  userSub: Subscription;
  totalPrice: number =0;
  totalDiscountPrice: number=0
  totalQuantity: number=0
  totalItems: number=0;
  discount : number;
  itemsId :string
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.select('shop').subscribe((shop) => {
      this.cart = shop.cart;
      this.cartItems = this.cart[0].items;
      this.calculateTotals()
    });
  }
  calculateTotals() {
    this.totalPrice = 0;
    this.totalDiscountPrice = 0;
    this.totalQuantity = 0;
    this.totalItems = 0;
    for (let item of this.cartItems) {
      console.log(item)
      this.totalQuantity += item.totalProductQuantity;
      this.totalPrice += item.totalProductPrice  * item.totalProductQuantity;
      this.totalDiscountPrice += item.totalProductDiscountPrice  * item.totalProductQuantity;
      this.totalItems++;
    }
    this.discount = this.totalPrice - this.totalDiscountPrice;
  }
  removeItem(item: OrderItem) {
    this.store.dispatch(new ShoppingListActions.RemoveProductFromCart(item.productId))
  }
  onIncrementCartItem(item: OrderItem) {
    this.store.dispatch(new ShoppingListActions.IncrementItemQuantity(item.productId))
    
  }
  onDecrementCartItem(id : string) {
    this.store.dispatch(new ShoppingListActions.DecrementItemQuantity(id))
  }
}