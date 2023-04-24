import { catchError } from 'rxjs';
import { OrderItem, Shop } from './../shop.model';
// import { Products } from '../../product/products.model';
import * as ShoppingCartActions from './shopping-list.action';

export interface ShopState {
  cart: OrderItem[];
}

const initialState: ShopState = {
  cart: [],
};

export function shoppingListReducer(
  state: ShopState | any = initialState,
  action: ShoppingCartActions.ShoppingCartActions
) {
  let updatedCart;
  switch (action.type) {
    case ShoppingCartActions.SAVE_USER_CART:
      return {
        ...state,
        cart: [...action.payload],
      };
    case ShoppingCartActions.INCREMENT_CART_ITEM_QUANTITY:
      updatedCart = state.cart;
      let updated1 = updatedCart.map((item: any) => {
        if (item.productId == action.payload) {
          let updatedItem = JSON.parse(JSON.stringify(item));
          if (updatedItem.totalProductQuantity < 10)
            updatedItem.totalProductQuantity += 1;
          return updatedItem;
        }
        return item;
      });
      return { ...state, cart: updated1 };
    case ShoppingCartActions.DECREMENT_CART_ITEM_QUANTITY:
      updatedCart = state.cart;
      let updated = updatedCart.map((item: any) => {
        if (item.productId == action.payload) {
          let updatedItem = JSON.parse(JSON.stringify(item));
          if (updatedItem.totalProductQuantity > 1) {
            updatedItem.totalProductQuantity -= 1;
          }
          return updatedItem;
        }
        return item;
      });
      return { ...state, cart: updated };

    case ShoppingCartActions.REMOVE_PRODUCT_FROM_CART:
      updatedCart= state.cart.filter((item: any) => {
        return item.productId !== action.payload;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return state;
  }
}
