import { Products } from './products.model';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ProductActions from './store/products.action';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Products[]> {
  constructor(private store: Store<fromApp.AppState>, private actions$ : Actions) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('products').pipe(
      take(1),
      map((productsState) => {
        return productsState.products;
      }),
      switchMap((products) => {
        if (products.length === 0) {
          this.store.dispatch(new ProductActions.GetProducts());
          return this.actions$.pipe(
            ofType(ProductActions.SAVE_NEW_PRODUCTS),
            take(1)
          );
        } else {
          return of(products);
        }
      })
    );
  }
}
