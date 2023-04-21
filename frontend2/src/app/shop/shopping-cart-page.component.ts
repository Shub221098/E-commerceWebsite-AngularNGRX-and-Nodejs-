import { ActivatedRoute } from '@angular/router';
import * as fromApp from './../store/app.reducer';
import * as ShoppingCartActions from './store/shopping-list.action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getId } from '../auth/store/auth.selector';
@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css'],
})
export class ShoppingCartPageComponent implements OnInit {
  id?: string;
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.store.select(getId).subscribe((id) => (this.id = id));
    if (this.id) {
      this.store.dispatch(new ShoppingCartActions.GetUserCart(this.id));
    }
  }
}
