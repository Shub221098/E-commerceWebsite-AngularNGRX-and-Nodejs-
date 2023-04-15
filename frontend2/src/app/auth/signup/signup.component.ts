import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  isLoading = false;
  error: string | any;
  closeSub: Subscription;
  message: string | null;
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.store.dispatch(
      new AuthActions.SignupStart({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        passwordConfirm: form.value.confirmPassword,
      })
    );
    form.reset();
  } 
}
