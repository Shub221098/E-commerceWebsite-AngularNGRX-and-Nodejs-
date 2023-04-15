import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] SignUp Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const VERIFY_EMAIL = '[Auth] Verify Email';
export const FORGET_PASSWORD = '[Auth] Forget Password'
export const RESET_PASSWORD = '[Auth] Reset Password'
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      email: string;
      name: string;
      role: string;
      active: boolean;
      token: string;
      redirect: boolean
    }
  ) {}
}
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}
export class ForgetPassword implements Action {
  readonly type = FORGET_PASSWORD;
  constructor(public payload: string) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(
    public payload: {
      name: string;
      email: string;
      password: string;
      passwordConfirm: string;
    }
  ) {}
}
export class VerifyEmail implements Action {
  readonly type = VERIFY_EMAIL;
  constructor(public payload: string) {}
}
export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;
  constructor(public payload: {token:string, password: string}) {}
}
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin
  | VerifyEmail | ForgetPassword | ResetPassword;
