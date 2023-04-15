// import * as fromShoppingList from '.././shopping-cart-page/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProducts from './../product/store/products.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  // shoppingList: fromShoppingList.State;
  auth: fromAuth.AuthState;
  products: fromProducts.ProductState;
}
export const appReducer: ActionReducerMap<AppState, any> = {
  // shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  products : fromProducts.productsReducer,
};
