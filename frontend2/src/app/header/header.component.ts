import * as ProductActions from '../product/store/products.action';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthAction from '../auth/store/auth.actions';
import * as fromApp from './../store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean;
  role: string;
  admin: boolean;
  constructor(private store: Store<fromApp.AppState>, private router: Router, private route : ActivatedRoute) {}
  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState))
      .subscribe((user) => {
        this.isAuthenticated = user.isAuthenticated;
        if (user.user?.role) {
          this.role = user.user.role;
          if (this.role === 'admin') {
            this.admin = true;
          }
        }
      });
  }
  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
