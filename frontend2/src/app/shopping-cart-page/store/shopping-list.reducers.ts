// // import {Product} from '../../core/models/Product';
// import * as ShoppingCartActions from './shopping-list.action';

// export interface State {
//   // cart: Array<Product>;
// }

// const initialState: State = {
//   cart: []
// };

// export function shoppingListReducer(state = initialState, action: ShoppingCartActions.ShoppingCartActions) {
//   let updatedCart;
//   let updatedItemIndex;

//   switch (action.type) {
//     case ShoppingCartActions.INCREMENT_CART_ITEM_QUANTITY:
//       updatedCart = [...state.cart];
//       updatedItemIndex = updatedCart.findIndex(
//         item => item.id === action.payload
//       );

//       if (updatedCart[updatedItemIndex].quantity > 9) {
//         return state;
//       }

//       const incrementedItem = {
//         ...updatedCart[updatedItemIndex]
//       };

//       incrementedItem.quantity++;

//       updatedCart[updatedItemIndex] = incrementedItem;


//       return {...state, cart: updatedCart};

//     case ShoppingCartActions.DECREMENT_CART_ITEM_QUANTITY:
//       updatedCart = [...state.cart];
//       updatedItemIndex = updatedCart.findIndex(
//         item => item.id === action.payload
//       );

//       if (updatedCart[updatedItemIndex].quantity < 2) {
//         return state;
//       }


//       const decrementedItem = {
//         ...updatedCart[updatedItemIndex]
//       };

//       decrementedItem.quantity--;

//       updatedCart[updatedItemIndex] = decrementedItem;

//       return {...state, cart: updatedCart};

//     case ShoppingCartActions.ADD_PRODUCT_TO_CART:
//       updatedCart = [...state.cart];
//       updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);

//       if (updatedItemIndex < 0) {
//         updatedCart.push({...action.payload, quantity: 1});
//       } else {
//         const updatedItem = {
//           ...updatedCart[updatedItemIndex]
//         };

//         updatedItem.quantity++;
//         updatedCart[updatedItemIndex] = updatedItem;
//       }

//       return {...state, cart: updatedCart};
//     case ShoppingCartActions.REMOVE_PRODUCT_FROM_CART:
//       updatedCart = [...state.cart];
//       updatedItemIndex = updatedCart.findIndex(
//         item => item.id === action.payload
//       );

//       updatedCart.splice(updatedItemIndex, 1);

//       return {...state, cart: updatedCart};
//     default:
//       return state;

//   }

// }