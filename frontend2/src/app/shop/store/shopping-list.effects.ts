import { setLoadingSpinner } from './../../shared/store/shared.action';
import { OrderItem } from 'src/app/shop/shop.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from './../store/shopping-list.action';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ShoppingCartEffects {
  addProducttoCart = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.ADD_PRODUCT_TO_CART),
        switchMap(
          (shoppingListAction: ShoppingListActions.AddProductToCart) => {
            return this.http
              .post<OrderItem[]>('@baseUrl/carts', shoppingListAction.payload)
              .pipe(
                map((cart) => {
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.router.navigate(['/shop']);
                  return new ShoppingListActions.SaveUserCart(cart);
                })
              );
          }
        )
      );
    },
    { dispatch: false }
  );
  getUserCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListActions.GET_USER_CART),
      switchMap((shoppingListAction: ShoppingListActions.GetUserCart) => {
        return this.http.get<OrderItem[]>(
          `@baseUrl/users/${shoppingListAction.payload}/carts`
        );
      }),
      map((cart) => {
        console.log(cart);
        return new ShoppingListActions.SaveUserCart(cart);
      })
    );
  });
  checkout = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListActions.CHECKOUT),
      switchMap((shoppingListAction: ShoppingListActions.CartCheckout) => {
        return this.http.post<any>(
          '@baseUrl/orders',
          shoppingListAction.payload
        );
      }),
      map((resData) => {
        const message =
          resData.message + 'Continue Shopping with us. Thank you';
        this.toastr.success(message);
        this.store.dispatch(setLoadingSpinner({ status: false }));
        this.router.navigate(['/categories']);
        let cart = null;
        return new ShoppingListActions.UpdateCartAfterCheckout(cart);
      })
    );
  });

  addQuantity = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.INCREMENT_CART_ITEM_QUANTITY),
        switchMap(
          (shoppingListAction: ShoppingListActions.IncrementItemQuantity) => {
            return this.http.patch<OrderItem[]>(
              `@baseUrl/carts/addQuantity/${shoppingListAction.payload}`,
              {}
            );
          }
        )
      );
    },
    { dispatch: false }
  );

  removeQuantity = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.DECREMENT_CART_ITEM_QUANTITY),
        switchMap(
          (shoppingListAction: ShoppingListActions.DecrementItemQuantity) => {
            return this.http.patch<OrderItem[]>(
              `@baseUrl/carts/deleteQuantity/${shoppingListAction.payload}`,
              {}
            );
          }
        )
      );
    },
    { dispatch: false }
  );
  removeProduct = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.REMOVE_PRODUCT_FROM_CART),
        switchMap(
          (shoppingListAction: ShoppingListActions.RemoveProductFromCart) => {
            return this.http.patch<{ status: string; message: string }>(
              `@baseUrl/carts/removeProduct/${shoppingListAction.payload}`,
              {}
            );
          }
        )
      );
    },
    { dispatch: false }
  );
  UpdateCartAfterCheckout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.UPDATE_CART_AFTER_CHECKOUT),
        switchMap(
          (shoppingListAction: ShoppingListActions.UpdateCartAfterCheckout) => {
            return this.http.patch<OrderItem[] | null>(
              '@baseUrl/carts',
              shoppingListAction.payload
            );
          }
        ),
        map((cart) => {
          console.log(cart);
          return new ShoppingListActions.SaveUserCart(cart);
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) {}
}
