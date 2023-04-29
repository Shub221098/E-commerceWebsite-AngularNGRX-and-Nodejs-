import { ConnectableObservable } from 'rxjs';
import { Products } from '../products.model';
import * as ProductActions from '../store/products.action';

export interface ProductState {
  products: Products[]; 
}
const intialState: ProductState = {
  products: [],
};
export function productsReducer(
  state: ProductState | any= intialState,
  action: ProductActions.ProductActions
) {
  let updatedProduct
  switch (action.type) {
    case ProductActions.ADD_QUANTITY: 
    const updated1 = state.products.map((item: any) => {
      if (item.id == action.payload) {
        let updatedItem = JSON.parse(JSON.stringify(item));
        if (updatedItem.quantity < updatedItem.stock)
          updatedItem.quantity += 1;
        return updatedItem;
      }
      return item;
    });
    return { ...state, products: updated1 };

    case ProductActions.REMOVE_QUANTITY: 
    const updated2 = state.products.map((item: any) => {
      if (item.id == action.payload) {
        let updatedItem = JSON.parse(JSON.stringify(item));
        if (updatedItem.quantity > 1)
          updatedItem.quantity -= 1;
        return updatedItem;
      }
      return item;
    });

    return { ...state, products: updated2 };


    case ProductActions.UPDATE_QUANTITY: 
    const updated3 = state.products.map((item: any) => {
      if (item.id == action.payload.id) {
        let updatedItem = JSON.parse(JSON.stringify(item));
        updatedItem.quantity = action.payload.quantity
        return updatedItem;
      }
      return item;
    });
    console.log(updated1)

    return { ...state, products: updated3 };
    case ProductActions.SAVE_NEW_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        isLoading: true,
      };
    case ProductActions.ADD_PRODUCT:
      const product = {
          _id : action.payload.get('id'),
          name : action.payload.get('name'),
          description : action.payload.get('description'),
          category : action.payload.get('category'),
          brand : action.payload.get('brand'),
          price : action.payload.get('price'),
          discountPrice : action.payload.get('discountPrice'),
          stock : action.payload.get('stock'),
          mainImage : action.payload.get('mainImage'),
          quantity : action.payload.get('quantity'),
          active: action.payload.get('active'),
          ratingsAverage : action.payload.get('ratingsAverage'),
          inStock : action.payload.get('inStock'),
          numberofReviews : action.payload.get('numberofReviews'),
          rating: action.payload.get('rating'),
          createdAt : action.payload.get('createdAt'),
        }
      console.log(product)
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ProductActions.UPDATE_PRODUCT:
      console.log(action.payload)
      let updatedProduct = state.products.map((product: any) => {
        return product.id === action.payload.index
          ? action.payload.newProduct
          : product;
      });
      console.log(updatedProduct)
      return {
        ...state,
        products: [...updatedProduct],
      };
    case ProductActions.DELETE_PRODUCT:
      const updatedProducts = state.products.filter((product: any) => {
        return product.id !== action.payload;
      });
      return {
        ...state,
        products: updatedProducts,
      };
    
    default:
      return state;
  }
}
