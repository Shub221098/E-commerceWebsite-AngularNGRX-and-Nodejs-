import { getLoading } from './shared/store/shared.selector';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoading : Observable<boolean>
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin())
    this.showLoading = this.store.select(getLoading)
  }
}
