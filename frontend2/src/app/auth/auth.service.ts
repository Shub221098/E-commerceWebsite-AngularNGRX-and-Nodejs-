import { Injectable, ViewChild } from '@angular/core';
import * as fromApp from '.././store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '.././auth/store/auth.actions';
import { PlaceHolderDirective } from '../shared/placeHolderDirective/placeholder.Directive';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;
  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }
  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      console.log(this.tokenExpirationTimer.toString());

      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
