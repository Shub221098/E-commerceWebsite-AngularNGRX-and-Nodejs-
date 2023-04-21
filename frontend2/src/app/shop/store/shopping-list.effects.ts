import { Shop } from './../shop.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Products } from "src/app/product/products.model";
import * as fromApp from "../../store/app.reducer"
import * as ShoppingListActions from "./../store/shopping-list.action"
import { Router } from '@angular/router';
@Injectable()
export class ShoppingCartEffects {
  addProducttoCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListActions.ADD_PRODUCT_TO_CART),
      switchMap((shoppingListAction: ShoppingListActions.AddProductToCart) => {
        return this.http.post<Products>(
          'http://localhost:3000/api/v1/carts',
          shoppingListAction.payload
        );
      }),
      map(resData=>{
         this.router.navigate(['/shop'])
      })
    )
  },{dispatch:false});
  getUserCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShoppingListActions.GET_USER_CART),
      switchMap((shoppingListAction: ShoppingListActions.GetUserCart) => {
        return this.http.get<Shop[]>(
          `http://localhost:3000/api/v1/users/${shoppingListAction.payload}/carts`
        );
      }),
      map((cart) => {
        return new ShoppingListActions.SaveUserCart(cart);
      })
    );
  });
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
