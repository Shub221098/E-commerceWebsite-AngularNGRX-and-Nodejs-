// Auth guard file is used to locked all the routes request without loginin.
// if we are not logged in we can't route localhost:4200/recipes directly and redirect to auth page.

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import { map, Observable, take, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      map((user) => {
        console.log(user)
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
