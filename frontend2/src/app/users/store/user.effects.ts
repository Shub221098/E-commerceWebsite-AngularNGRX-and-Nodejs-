import { User } from 'src/app/auth/user.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as UserActions from './user.action';
@Injectable()
export class UsersEffects {
  getUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GET_USERS),
      switchMap(() => {
        return this.http.get<User[]>(`@baseUrl/users`);
      }),
      map((user) => {
        console.log(user);
        return new UserActions.SaveUsers(user);
      })
    );
  });
  updateUserStatus = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UPDATE_USERS),
      switchMap((userActions: UserActions.UpdateUser) => {
        return this.http.patch(
          `@baseUrl/users/toggleActive/${userActions.payload}`,
          {}
        );
      }),
      map((user: any) => {
        return new UserActions.UpdateUserInStore(user);
      })
    );
  });
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
