// import {Product} from '../../core/models/Product';

// export const ADD_PRODUCT_TO_CART = '[ShoppingCart] Add Product to Cart';
// export const REMOVE_PRODUCT_FROM_CART = '[ShoppingCart] Remove Product from Cart';
// export const INCREMENT_CART_ITEM_QUANTITY = '[ShoppingCart] Increment item quantity';
// export const DECREMENT_CART_ITEM_QUANTITY = '[ShoppingCart] Decrement item quantity';


// export class AddProductToCart {
//   readonly type = ADD_PRODUCT_TO_CART;

//   constructor(public payload: Product) {
//   }
// }

// export class RemoveProductFromCart {
//   readonly type = REMOVE_PRODUCT_FROM_CART;

//   constructor(public payload: number) {
//   }
// }

// export class IncrementCartQuantity {
//   readonly type = INCREMENT_CART_ITEM_QUANTITY;

//   constructor(public payload: number) {
//   }
// }

// export class DecrementCartQuantity {
//   readonly type = DECREMENT_CART_ITEM_QUANTITY;

//   constructor(public payload: number) {
//   }
// }

// export type ShoppingCartActions = AddProductToCart | RemoveProductFromCart | IncrementCartQuantity | DecrementCartQuantity;