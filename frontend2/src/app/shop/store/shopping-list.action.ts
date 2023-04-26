import { OrderItem } from 'src/app/shop/shop.model';
import { Orders } from './../order.model';
import { Action } from '@ngrx/store';
import { Shop } from '../shop.model';
export const ADD_PRODUCT_TO_CART = '[ShoppingCart] Add Product to Cart';
export const REMOVE_PRODUCT_FROM_CART = '[ShoppingCart] Remove Product from Cart';
export const INCREMENT_CART_ITEM_QUANTITY = '[ShoppingCart] Increment item quantity';
export const DECREMENT_CART_ITEM_QUANTITY = '[ShoppingCart] Decrement item quantity';
export const GET_USER_CART = '[ShoppingCart] Get User Cart';
export const SAVE_USER_CART = '[ShoppingCart] Save User Cart';
export const CHECKOUT = '[Orders] Checkout'
export const UPDATE_CART_AFTER_CHECKOUT = '[ShoppingCart] Update Cart'
export class SaveUserCart implements Action {
  readonly type = SAVE_USER_CART
  constructor(public payload: OrderItem[]|null) {
  }
}
export class CartCheckout implements Action {
  readonly type = CHECKOUT
  constructor(public payload: Orders) {
  }
}
export class GetUserCart implements Action{
  readonly type = GET_USER_CART
  constructor(public payload: string){
  }
}
export class AddProductToCart implements Action{
  readonly type = ADD_PRODUCT_TO_CART;

  constructor(public payload: {}) {
  }
}

export class RemoveProductFromCart implements Action{
  readonly type = REMOVE_PRODUCT_FROM_CART;

  constructor(public payload: string) {
  }
}
export class UpdateCartAfterCheckout implements Action{
  readonly type = UPDATE_CART_AFTER_CHECKOUT
  constructor(public payload: string|null){}
}

export class IncrementItemQuantity implements Action{
  readonly type = INCREMENT_CART_ITEM_QUANTITY;

  constructor(public payload: string) {
  }
}

export class DecrementItemQuantity implements Action{
  readonly type = DECREMENT_CART_ITEM_QUANTITY;

  constructor(public payload: string) {
  }
}

export type ShoppingCartActions = UpdateCartAfterCheckout |CartCheckout | GetUserCart |SaveUserCart |AddProductToCart | RemoveProductFromCart | IncrementItemQuantity | DecrementItemQuantity;