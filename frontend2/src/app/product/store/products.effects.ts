import * as fromApp from './../../store/app.reducer';
import { HttpClient } from '@angular/common/http';
import * as ProductActions from './products.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Products } from '../products.model';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductsEffects {
  getProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCTS),
      switchMap(() => {
        return this.http.get<Products[]>(
          'http://localhost:4000/api/v1/products'
        );
      }),
      map((product) => {
        console.log(product);
        return new ProductActions.SaveNewProducts(product);
      })
    );
  });
  storeProducts = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.STORE_PRODUCTS),
        withLatestFrom(this.store.select('products')),
        switchMap(([actionData, productsState]) => {
          return this.http.put(
            'https://e-commerce-application-1120c-default-rtdb.firebaseio.com/recipes.json',
            productsState.products
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
