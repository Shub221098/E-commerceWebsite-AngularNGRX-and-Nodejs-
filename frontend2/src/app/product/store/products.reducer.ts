import { Products } from '../products.model';
import * as ProductActions from '../store/products.action';

export interface ProductState {
  products: Products[];
}
const intialState: ProductState = {
  products: [],
};
export function productsReducer(
  state: ProductState = intialState,
  action: ProductActions.ProductActions
){
  switch (action.type) {
    case ProductActions.SAVE_NEW_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };
    case ProductActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ProductActions.UPDATE_PRODUCT:
      const updatedProduct = {
        ...state.products[action.payload.index],
        ...action.payload.newRecipe,
      };
    //   this.updated 
      const updateProducts = [...state.products];
      updateProducts[action.payload.index] = updatedProduct;
      return {
        ...state,
        products : updateProducts
      };
    case ProductActions.DELETE_PRODUCT: 
    return {
        ...state,
        products : state.products.filter((product, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
