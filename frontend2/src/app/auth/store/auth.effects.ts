import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { ThisReceiver } from '@angular/compiler';

export const handleAuthentication = (
  userId: string,
  email: string,
  name: string,
  role: string,
  active: boolean,
  token: string,
) => {
  const user = new User(
    userId,
    email,
    name,
    role,
    active,
    token,
  );
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    active: user.active,
    token: user.token,
    redirect :true,
  });
};

export const handleError = (errResp: any) => {
  let errorMessage = 'An unknown error occurred while signing up';
  if (!errResp.error || !errResp.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errResp.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'Email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Email not found';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
          return this.http
            .post<{ status: string; message: string }>(
              'http://localhost:3000/api/v1/users/signup',
              {
                name: signupAction.payload.name,
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                passwordConfirm: signupAction.payload.passwordConfirm,
                returnSecureToken: true,
              }
            )
            .pipe(
              map((resData) => {
                alert(resData.message);
                // this.router.navigate(['/auth/signup']);
              }),
              catchError((errResp) => {
                return handleError(errResp);
              })
            );
        })
      );
    },
    { dispatch: false }
  );
  authverifyEmail = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.VERIFY_EMAIL),
        switchMap((verifyAction: AuthActions.VerifyEmail) => {
          return this.http
            .post<any>(`http://localhost:3000/api/v1/users/verify-account`, {
              token: verifyAction.payload,
            })
            .pipe(
              map((resData) => {
                return handleAuthentication(
                  resData.user.id,
                  resData.user.email,
                  resData.user.name,
                  resData.user.role,
                  resData.user.active,
                  resData.token,
                );
              }),
              catchError((errResp) => {
                return handleError(errResp);
              })
            );
        })
      );
    },
    { dispatch: false }
  );
  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<any>('http://localhost:3000/api/v1/users/login', {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            map((resData) => {
              return handleAuthentication(
                resData.user.id,
                resData.user.email,
                resData.user.name,
                resData.user.role,
                resData.user.active,
                resData.user.token
              );
            }),catchError((errResp) => {
              return handleError(errResp) 
            })
          );
      })
    );
  });

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
          if (authSuccessAction.payload.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          userId: string;
          email: string;
          name: string;
          role: string;
          active: true;
          token: string;
        } = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData) {
          return { type: 'DUMMY' };
        }
        const loadedUser = new User(
          userData.userId,
          userData.email,
          userData.name,
          userData.role,
          userData.active,
          userData.token,
        );
        if (loadedUser.token) {
          return new AuthActions.AuthenticateSuccess({
            userId: loadedUser.id,
            email: loadedUser.email,
            name: loadedUser.name,
            role: loadedUser.role,
            active: loadedUser.active,
            token: loadedUser.token,
            redirect : true,
          });
        }
        return { type: 'DUMMY' };
      })
    );
  });

  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      console.log('hello)')
      this.router.navigate(['/auth']);
    })
  );
  authForgetPassword = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.FORGET_PASSWORD),
      switchMap((authData: AuthActions.ForgetPassword) => {
        return this.http
          .post<any>('http://localhost:3000/api/v1/users/forgotPassword', {
            email: authData.payload
          })
          .pipe(
            tap((resData) => {
              alert(resData.message);
              // this.router.navigate(['/auth/forgetPassword']);
            }),catchError((errResp) => {
              return handleError(errResp) 
            })
          );
      })
    );
  });
  authResetPassword = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.RESET_PASSWORD),
        switchMap((resetPasswordAction: AuthActions.ResetPassword) => {
          return this.http
            .patch<any>(`http://localhost:3000/api/v1/users/reset-password`, {
              token: resetPasswordAction.payload.token,
              password: resetPasswordAction.payload.password
            })
            .pipe(
              map((resData) => {
                return handleAuthentication(
                  resData.user.id,
                  resData.user.email,
                  resData.user.name,
                  resData.user.role,
                  resData.user.active,
                  resData.token,
                );
              }),
              tap(() => {
                  alert("Password Changed Successfully.Login with New Password")
                  this.router.navigate(['/auth/login'])
              }),
              catchError((errResp) => {
                return handleError(errResp);
              })
            );
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {}
}

