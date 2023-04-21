// import * as fromShoppingList from '.././shopping-cart-page/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProducts from './../product/store/products.reducer';
import * as fromShoppingCart from './../shop/store/shopping-list.reducers'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shop: fromShoppingCart.ShopState;
  auth: fromAuth.AuthState;
  products: fromProducts.ProductState;
}
export const appReducer: ActionReducerMap<AppState, any> = {
  shop: fromShoppingCart.shoppingListReducer,
  auth: fromAuth.authReducer,
  products : fromProducts.productsReducer,
};
