import { SHARED_STATE_NAME } from './../shared/store/shared.selector';
// import * as fromShoppingList from '.././shopping-cart-page/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProducts from './../product/store/products.reducer';
import * as fromShoppingCart from './../shop/store/shopping-list.reducers';
import * as fromUsers from './../users/store/user.reducer';
import { SharedState } from './../shared/store/shared.state';
import { ActionReducerMap } from '@ngrx/store';
import { SharedReducer } from '../shared/store/shared.reducer';

export interface AppState {
  shop: fromShoppingCart.ShopState;
  auth: fromAuth.AuthState;
  products: fromProducts.ProductState;
  user: fromUsers.UserState;
  [SHARED_STATE_NAME]: SharedState;
}
export const appReducer: ActionReducerMap<AppState, any> = {
  shop: fromShoppingCart.shoppingListReducer,
  auth: fromAuth.authReducer,
  products: fromProducts.productsReducer,
  user: fromUsers.userReducer,
  [SHARED_STATE_NAME] : SharedReducer
};
