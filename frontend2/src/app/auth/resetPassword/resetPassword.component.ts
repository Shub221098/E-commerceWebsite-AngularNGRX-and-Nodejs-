import { ActivatedRoute } from '@angular/router';
import * as fromApp from './../store/auth.reducers';
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as AuthActions from "./../store/auth.actions"
@Component({
    selector: 'app-signup',
    templateUrl: './resetPassword.component.html',
  })
export class ResetPasswordComponent{
    token: string;
    constructor(private store: Store<fromApp.AuthState>, private route: ActivatedRoute){}
    onSubmit(form: NgForm) {
        if (!form.valid) {
          return;
        }
        if(form.value.password !== form.value.confirmPassword){
            alert("Password and Confirm Password does'nt match");
            return;
        }
        this.route.params.subscribe(params => this.token = params['token']);
        this.store.dispatch(
          new AuthActions.ResetPassword({token: this.token, password :form.value.password})
        );
        form.reset();
      }
}