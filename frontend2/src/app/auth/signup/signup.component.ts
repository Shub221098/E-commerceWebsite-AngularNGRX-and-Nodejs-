import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';
import { PlaceHolderDirective } from 'src/app/shared/placeHolderDirective/placeholder.Directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  isLoading = false;
  success: string | any
  closeSub: Subscription;
  message: string | null;
validateEqual: any;
  passwordsMatching: boolean;
  confirmPasswordClass: string;
  isConfirmPasswordDirty: boolean;
  constructor(
    private store: Store<fromApp.AppState>,private componentFactoryResolver : ComponentFactoryResolver
) {}
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.success = "Token Sent to Email Successfully.Check Your Email and Activate your Account"
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
  onHandlingError(){
    this.success = null;
  }
}
