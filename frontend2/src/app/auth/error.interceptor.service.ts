import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>, private router: Router, private toasters : ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let errorMessage
        if ([401].includes(err.status)) {
        this.toasters.error(err.error.message)
          this.store.dispatch(new AuthActions.Logout());
          this.router.navigate(['/auth/login']);
        }
        else if([400,500].includes(err.status)){
          this.toasters.error(err.error.message)
        }
        const error = err.error?.message || err.statusText;
        return throwError(() => error);
      })
    );
  }
}
