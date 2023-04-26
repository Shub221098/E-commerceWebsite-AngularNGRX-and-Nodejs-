import { OrderItem } from 'src/app/shop/shop.model';
import { INCREMENT_CART_ITEM_QUANTITY, UpdateCartAfterCheckout, ShoppingCartActions } from './shopping-list.action';
import {
  AddQuantity,
  ADD_QUANTITY,
} from './../../product/store/products.action';
import { Shop } from './../shop.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Products } from 'src/app/product/products.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from './../store/shopping-list.action';
import { Router } from '@angular/router';
import { Orders } from '../order.model';
@Injectable()
export class ShoppingCartEffects {
  addProducttoCart = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.ADD_PRODUCT_TO_CART),
        switchMap(
          (shoppingListAction: ShoppingListActions.AddProductToCart) => {
            return this.http.post<OrderItem[]>(
              'http://localhost:3000/api/v1/carts',
              shoppingListAction.payload
            );
          }
        ),
        map((cart) => {
          console.log("readched here", cart)
          this.router.navigate(['/shop']);
          return new ShoppingListActions.SaveUserCart(cart);
        })
      );
    },
    { dispatch: false }
  );
  getUserCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListActions.GET_USER_CART),
      switchMap((shoppingListAction: ShoppingListActions.GetUserCart) => {
        return this.http.get<OrderItem[]>(
          `http://localhost:3000/api/v1/users/${shoppingListAction.payload}/carts`
        );
      }),
      map((cart) => {
        console.log(cart);
        return new ShoppingListActions.SaveUserCart(cart);
      })
    );
  });
  checkout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.CHECKOUT),
        switchMap((shoppingListAction: ShoppingListActions.CartCheckout) => {
          return this.http.post<any>(
            'http://localhost:3000/api/v1/orders',
            shoppingListAction.payload
          );
        }),
        map((resData) => {
          const message =
            resData.message + 'Continue Shopping with us. Thank you';
          alert(message);
          this.router.navigate(['/products']);
          let cart = null
          return new ShoppingListActions.UpdateCartAfterCheckout(cart)
        })
      );
    },
  );

  addQuantity = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShoppingListActions.INCREMENT_CART_ITEM_QUANTITY),
        switchMap(
          (shoppingListAction: ShoppingListActions.IncrementItemQuantity) => {
            return this.http.patch<OrderItem[]>(
              `http://localhost:3000/api/v1/carts/addQuantity/${shoppingListAction.payload}`,
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
              `http://localhost:3000/api/v1/carts/deleteQuantity/${shoppingListAction.payload}`,
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
            return this.http.patch<{status : string, message: string}>(
              `http://localhost:3000/api/v1/carts/removeProduct/${shoppingListAction.payload}`,
              {}
            );
          }
        ),
      );
    },
    { dispatch: false }
  );
  UpdateCartAfterCheckout = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListActions.UPDATE_CART_AFTER_CHECKOUT),
      switchMap((shoppingListAction : ShoppingListActions.UpdateCartAfterCheckout) =>{
        return this.http.patch<OrderItem[] | null>('http://localhost:3000/api/v1/carts', shoppingListAction.payload)
      }),
      map((cart) => {
        console.log(cart);
        return new ShoppingListActions.SaveUserCart(cart);
      })
    )
  },{dispatch:false})
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
