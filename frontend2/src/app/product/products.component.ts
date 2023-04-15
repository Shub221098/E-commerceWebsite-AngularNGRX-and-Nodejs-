import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ProductActions from '.././product/store/products.action';
@Component({
  selector: 'app-product',
  templateUrl: 'products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductComponent implements OnInit {
  loading = false;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(){
    if(!this.loading){
      console.log(this.loading)
      this.loading = true;
      this.store.dispatch(new ProductActions.GetProducts())
    }
  }
}
