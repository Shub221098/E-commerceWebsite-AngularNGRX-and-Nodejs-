import * as fromApp from './../store/auth.reducers';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from './../store/auth.actions';
import { getMessage } from '../store/auth.selector';
@Component({
  selector: 'app-signup',
  templateUrl: './forgotPassword.component.html',
})
export class ForgotPasswordComponent {
  constructor(private store: Store<fromApp.AuthState>) {}
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.store.dispatch(new AuthActions.ForgetPassword(form.value.email));
    form.reset();
  }
}
