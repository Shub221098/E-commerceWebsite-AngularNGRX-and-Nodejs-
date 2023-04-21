import * as fromApp from './../../store/app.reducer';
import { HttpClient } from '@angular/common/http';
import * as ProductActions from './products.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Products } from '../products.model';
import { map, switchMap, take, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductsEffects {
  getProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCTS),
      switchMap(() => {
        return this.http.get<Products[]>(
          'http://localhost:3000/api/v1/products'
        );
      }),

      map((product) => {
        return new ProductActions.SaveNewProducts(product);
      })
    );
  });
  addProducts = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.ADD_PRODUCT),
        switchMap((productAction: ProductActions.AddProducts) => {
          return this.http.post<Products>(
            'http://localhost:3000/api/v1/products',
            productAction.payload
          );
        }),
        map((product) => {
          return new ProductActions.SaveNewProducts(product);
        })
      );
    },
  );
  updateProducts = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.UPDATE_PRODUCT),
        switchMap((productAction: ProductActions.UpdateProducts) => {
          return this.http.patch(
            `http://localhost:3000/api/v1/products/${productAction.payload.index}`,
            productAction.payload.newProduct
          );
        })
      );
    },
    { dispatch: false }
  );
  deleteProducts = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.DELETE_PRODUCT),
        switchMap((productAction: ProductActions.DeleteProducts) => {
          return this.http.delete(
            `http://localhost:3000/api/v1/products/${productAction.payload}`
          );
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
