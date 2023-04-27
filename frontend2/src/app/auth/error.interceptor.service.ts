import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
        //   alert('You are not logged in. Please login to get access');
        alert(err.error.message)
          this.store.dispatch(new AuthActions.Logout());
          this.router.navigate(['/auth/login']);
        }
        const error = err.error?.message || err.statusText;
        return throwError(() => error);
      })
    );
  }
}
