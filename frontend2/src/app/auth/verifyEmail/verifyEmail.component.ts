import { setLoadingSpinner } from './../../shared/store/shared.action';
import * as AuthActions from './../store/auth.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-message',
  templateUrl: 'verifyEmail.component.html',
})
export class VerifyEmailComponent implements OnInit {
  user: any;
  token : string;
  isVerified: boolean = false;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => this.token = params['token'])
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(new AuthActions.VerifyEmail(this.token))
  }
  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}
