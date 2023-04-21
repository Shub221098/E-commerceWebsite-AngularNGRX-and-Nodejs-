import { Action } from '@ngrx/store';
import { Shop } from '../shop.model';
export const ADD_PRODUCT_TO_CART = '[ShoppingCart] Add Product to Cart';
export const REMOVE_PRODUCT_FROM_CART = '[ShoppingCart] Remove Product from Cart';
export const INCREMENT_CART_ITEM_QUANTITY = '[ShoppingCart] Increment item quantity';
export const DECREMENT_CART_ITEM_QUANTITY = '[ShoppingCart] Decrement item quantity';
export const GET_USER_CART = '[ShoppingCart] Get User Cart';
export const SAVE_USER_CART = '[ShoppingCart] Save User Cart';
export class SaveUserCart implements Action {
  readonly type = SAVE_USER_CART
  constructor(public payload: Shop[]) {
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

export type ShoppingCartActions = GetUserCart |SaveUserCart |AddProductToCart | RemoveProductFromCart | IncrementItemQuantity | DecrementItemQuantity;