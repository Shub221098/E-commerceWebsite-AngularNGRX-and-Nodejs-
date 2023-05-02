import { getMessage } from './../store/auth.selector';

import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';
import { setLoadingSpinner } from 'src/app/shared/store/shared.action';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  isLoading = false;
  success: string | any;
  closeSub: Subscription;
  message: string | null;
  validateEqual: any;
  passwordsMatching: boolean;
  confirmPasswordClass: string;
  isConfirmPasswordDirty: boolean;
  constructor(
    private store: Store<fromApp.AppState>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.store.dispatch(setLoadingSpinner({status : true}))
    this.store.dispatch(
      new AuthActions.SignupStart({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        passwordConfirm: form.value.confirmPassword,
        address: form.value.address,
        city: form.value.city,
        state: form.value.state,
        postalCode: form.value.postalCode,
      })
    );
    form.reset();
    this.store.select(getMessage).subscribe((message) => this.message = message)
    console.log(this.message)
  }
  onChange(pw: string, cpw: string) {
    this.isConfirmPasswordDirty = true;
    if (pw == cpw) {
      this.passwordsMatching = true;
      this.confirmPasswordClass = 'form-control is-valid';
    } else {
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
    }
  }
  onHandlingError() {
    this.success = null;
  }
}
