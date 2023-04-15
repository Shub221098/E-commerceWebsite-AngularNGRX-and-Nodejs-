import * as ProductActions from './../../product/store/products.action';
import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from './../store/auth.actions'
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeHolderDirective/placeholder.Directive';
@Component({
  selector: 'app-signup',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string | any;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  storeSub : Subscription
  closeSub : Subscription
  constructor(private store: Store<fromApp.AppState>, private componentFactoryResolver: ComponentFactoryResolver) {}
  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
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
    this.store.dispatch(new AuthActions.ClearError());
  }
  showErrorAlert(message: string | null) {
    //with the help of component factory resolver you get access to the componentFactory
    // componentfactory resolver has resovle component factory method of type AlertComponenet to create AlertComponentFactory</AuthResponseData.
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // Now we create a concrete component but for that we also need a place where we can attach it into dom right now we dont have it
    // For this we have ViewContainerRef. it essentially an object managed by angular, which gives angular a reference to dom
    const hostViewContainerRef: any = this.alertHost.viewContainerRef;
    // clear this component reference to remove preivous values add new after
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = message;
    console.log(componentRef.instance.message);
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}