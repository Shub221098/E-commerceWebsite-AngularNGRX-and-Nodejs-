import { Router, ActivatedRoute } from '@angular/router';
import * as fromApp from './../../../store/app.reducer';
import { Products } from './../../products.model';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products-items',
  templateUrl: './products-items.component.html',
  styleUrls: ['./products-items.component.css'],
})
export class ProductsItemsComponent {
  @Input() products: Products;
  @Input() index: number;
  constructor(private store: Store<fromApp.AppState>, private router:Router, private route: ActivatedRoute) {
    console.log(this.index)
  }
  onDetail(){
   this.router.navigate([`${this.products.id}`],{relativeTo: this.route})
  }
  onCart(){
  }
}
