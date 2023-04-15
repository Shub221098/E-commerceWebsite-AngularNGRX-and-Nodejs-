import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromApp from './../store/app.reducer'
import * as AuthActions from './../auth/store/auth.actions'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>, private router : Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
                this.store.dispatch(new AuthActions.Logout);
                this.router.navigate(['/auth/login']);
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
}