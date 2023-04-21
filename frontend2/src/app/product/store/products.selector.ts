import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products.reducer';

const selectState = createFeatureSelector<ProductState>('products');

export const getCategories = createSelector(selectState, (state) =>
  Array.from(
    new Set(
      state.products.map((product) => {
        return product.category;
      })
    )
  )
);
