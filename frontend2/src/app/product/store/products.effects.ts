import { ToastrService } from 'ngx-toastr';
import { getName } from 'src/app/auth/store/auth.selector';
import * as fromApp from './../../store/app.reducer';
import { HttpClient } from '@angular/common/http';
import * as ProductActions from './products.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Products } from '../products.model';
import { map, switchMap, take, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setLoadingSpinner } from 'src/app/shared/store/shared.action';

@Injectable()
export class ProductsEffects {
  getProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCTS),
      switchMap(() => {
        return this.http.get<Products[]>('@baseUrl/products');
      }),

      map((product) => {
        return new ProductActions.SaveNewProducts(product);
      })
    );
  });
  addProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.ADD_PRODUCT),
      switchMap((productAction: ProductActions.AddProducts) => {
        return this.http.post<Products>(
          '@baseUrl/products',
          productAction.payload
        );
      }),
      map((data) => {
        const message = 'Product added successfully';
        this.toastr.success(message);
        this.store.dispatch(setLoadingSpinner({ status: false }));
        this.router.navigate(['/products']);
        return new ProductActions.AddProductsInStore(data);
      })
    );
  });
  updateProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.UPDATE_PRODUCT),
      switchMap((productAction: ProductActions.UpdateProducts) => {
        return this.http.patch<Products>(
          `@baseUrl/products/${productAction.payload.index}`,
          productAction.payload.newProduct
        );
      }),
      map((data) => {
        const message = 'Product updated successfully';
        this.toastr.success(message);
        this.store.dispatch(setLoadingSpinner({ status: false }));
        this.router.navigate(['/products']);
        return new ProductActions.UpdateProductInStore(data);
      })
    );
  });
  deleteProducts = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.DELETE_PRODUCT),
        switchMap((productAction: ProductActions.DeleteProducts) => {
          return this.http.delete(`@baseUrl/products/${productAction.payload}`);
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService,
    private router: Router
  ) {}
}
