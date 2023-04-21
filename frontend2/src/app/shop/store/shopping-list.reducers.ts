import { catchError } from 'rxjs';
import { Shop } from './../shop.model';
// import { Products } from '../../product/products.model';
import * as ShoppingCartActions from './shopping-list.action';

export interface ShopState {
  cart: Shop[];
}

const initialState: ShopState = {
  cart: [],
};

export function shoppingListReducer(
  state : ShopState|any = initialState,
  action: ShoppingCartActions.ShoppingCartActions
) {
  let updatedCart;
  let updatedItemIndex;
  switch (action.type) {
    case ShoppingCartActions.SAVE_USER_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.payload],
      };
    case ShoppingCartActions.INCREMENT_CART_ITEM_QUANTITY:
      updatedCart = state.cart;
      const updatedItem1 = updatedCart.items.find(
        action.payload
      );

      if (updatedItem1.totalAvailablestock < 5) {
        return state;
      }

      updatedItem1.totalProductQuantity++;

      updatedCart.items.splice(updatedItem1, 1);
      return { ...state, cart: updatedCart };

    case ShoppingCartActions.DECREMENT_CART_ITEM_QUANTITY:
      updatedCart = state.cart;
      const updatedItem = updatedCart.map((item : any) => {
          item.items({})
      })
      console.log(updatedItem)
      const updatedItemIndex = updatedItem.find(
          (cart: any) => cart._id = action.payload
      );
      console.log(updatedItemIndex)


      const decrementedItem = {
        ...updatedItem[updatedItemIndex],
      };
console.log(decrementedItem)
      decrementedItem.totalProductQuantity--;

      updatedCart[updatedItemIndex] = decrementedItem;

      return { ...state, cart: updatedCart };

   
    // case ShoppingCartActions.ADD_PRODUCT_TO_CART:
    //   updatedCart = [...state.cart];
    //   updatedItemIndex = updatedCart.findIndex(
    //     (item) => item.id === action.payload.id
    //   );

    //   if (updatedItemIndex < 0) {
    //     updatedCart.push({ ...action.payload, stock: 1 });
    //   } else {
    //     const updatedItem = {
    //       ...updatedCart[updatedItemIndex],
    //     };

    //     updatedItem.stock++;
    //     updatedCart[updatedItemIndex] = updatedItem;
    //   }

    // return { ...state, cart: updatedCart };
  //   case ShoppingCartActions.REMOVE_PRODUCT_FROM_CART:
  //     updatedCart = [...state.cart];
  //     updatedItemIndex = updatedCart.findIndex(
  //       (item) => +item.id === action.payload
  //     );

  //     updatedCart.splice(updatedItemIndex, 1);

  //     return { ...state, cart: updatedCart };
  //   default:
  //     return state;
  }
}
