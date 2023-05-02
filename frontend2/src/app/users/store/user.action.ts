import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/user.model';
export const GET_USERS = '[Users] Get Users';
export const SAVE_USERS = '[Users] Save Users';
export const UPDATE_USERS = '[Users] Update Users';
export const UPDATE_USER_IN_STORE = '[Users] Update User in Store';

export class SaveUsers implements Action {
  readonly type = SAVE_USERS;
  constructor(public payload: User[] | null) {}
}
export class GetUsers implements Action {
  readonly type = GET_USERS;
}
export class UpdateUser implements Action {
  readonly type = UPDATE_USERS;
  constructor(public payload : string) {}
}
export class UpdateUserInStore implements Action {
    readonly type = UPDATE_USER_IN_STORE;
    constructor(public payload : User) {}
  }
export type UserActions = GetUsers | SaveUsers | UpdateUser | UpdateUserInStore;
