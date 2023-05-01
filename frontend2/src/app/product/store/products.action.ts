import { Products } from './../products.model';
import { Action } from '@ngrx/store';

export const SAVE_NEW_PRODUCTS = '[Products] Save Products';
export const GET_PRODUCTS = '[Products] Get Products';
export const ADD_PRODUCT = '[Products] Add Product';
export const DELETE_PRODUCT = '[Products] Delete Product';
export const UPDATE_PRODUCT = '[Products] Update Product';
export const STORE_PRODUCTS = '[Products] Store Products';
export const ADD_QUANTITY = '[Products] Add Quantity';
export const REMOVE_QUANTITY = '[Products] Remove Quantity';
export const UPDATE_QUANTITY = '[Products] Update Quantity'
export const ADD_PRODUCT_IN_STORE = '[Products] Add Product in Store'
export const UPDATE_PRODUCT_IN_STORE = '[Products] Update Product in Store'
export class SaveNewProducts implements Action {
  readonly type = SAVE_NEW_PRODUCTS;
  constructor(public payload: Products[] | any) {
  }
}
export class AddQuantity implements Action {
  readonly type = ADD_QUANTITY;
  constructor(public payload: string) {
  }
}
export class RemoveQuantity implements Action {
  readonly type = REMOVE_QUANTITY;
  constructor(public payload: string) {
  }
}
export class UpdateQuantity implements Action {
  readonly type = UPDATE_QUANTITY;
  constructor(public payload: {id: string, quantity: number}) {
  }
}
export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}
export class AddProducts implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: FormData) {}
}
export class UpdateProducts implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: { index: string; newProduct: FormData }) {}
}
export class AddProductsInStore implements Action {
  readonly type = ADD_PRODUCT_IN_STORE;
  constructor(public payload: Products) {}
}
export class UpdateProductInStore implements Action {
  readonly type = UPDATE_PRODUCT_IN_STORE;
  constructor(public payload: Products) {}
}
export class DeleteProducts implements Action {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: string) {}
}
export class StoreProducts implements Action {
  readonly type = STORE_PRODUCTS;
}
export type ProductActions =
  AddQuantity| RemoveQuantity | UpdateQuantity
  | AddProductsInStore
  | UpdateProductInStore
  | SaveNewProducts
  | GetProducts
  | DeleteProducts
  | UpdateProducts
  | AddProducts
  | StoreProducts;
