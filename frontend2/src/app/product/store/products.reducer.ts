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
) {
  switch (action.type) {
    case ProductActions.SAVE_NEW_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        isLoading: true,
      };
    case ProductActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ProductActions.UPDATE_PRODUCT:
      const updatedProduct = state.products.map((product) => {
        return product.id === action.payload.index
          ? action.payload.newProduct
          : product;
      });
      return {
        ...state,
        products: updatedProduct,
      };
    case ProductActions.DELETE_PRODUCT:
      const updatedProducts = state.products.filter((product) => {
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
