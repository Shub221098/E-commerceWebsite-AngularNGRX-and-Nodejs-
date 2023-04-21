import { Products } from './../products.model';
import { Action } from '@ngrx/store';

export const SAVE_NEW_PRODUCTS = '[Products] Save Products';
export const GET_PRODUCTS = '[Products] Get Products';
export const ADD_PRODUCT = '[Products] Add Product';
export const DELETE_PRODUCT = '[Products] Delete Product';
export const UPDATE_PRODUCT = '[Products] Update Product';
export const STORE_PRODUCTS = '[Products] Store Products';
export class SaveNewProducts implements Action {
  readonly type = SAVE_NEW_PRODUCTS;
  constructor(public payload: Products[] | any) {
  }
}
export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}
export class AddProducts implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: Products) {}
}
export class UpdateProducts implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: { index: string; newProduct: Products }) {}
}
export class DeleteProducts implements Action {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: string) {}
}
export class StoreProducts implements Action {
  readonly type = STORE_PRODUCTS;
}
export type ProductActions =
  | SaveNewProducts
  | GetProducts
  | DeleteProducts
  | UpdateProducts
  | AddProducts
  | StoreProducts;
