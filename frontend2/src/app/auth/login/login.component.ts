import * as ProductActions from './../../product/store/products.action';
import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from './../store/auth.actions'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string | any;
  storeSub : Subscription
  closeSub : Subscription
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.store.dispatch(
      new AuthActions.LoginStart({
        email: form.value.email,
        password: form.value.password,
      })
    );
    form.reset();
  }
  onHandlingError() {

      this.error = null;
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}