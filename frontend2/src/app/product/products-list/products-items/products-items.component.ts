import { AddProductToCart } from './../../../shop/store/shopping-list.action';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromApp from './../../../store/app.reducer';
import { Products } from './../../products.model';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRole } from 'src/app/auth/store/auth.selector';
import * as ProductActions from '../../store/products.action';
import * as ShoppingCartActions from '../../../shop/store/shopping-list.action'
@Component({
  selector: 'app-products-items',
  templateUrl: './products-items.component.html',
  styleUrls: ['./products-items.component.css'],
})
export class ProductsItemsComponent {
  @Input() products: Products;
  @Input() index: number;
  @Input() productId: string;
  @Input() category : string
  admin: boolean = false;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.store.select(getRole).subscribe((role) => {
      if (role === 'admin') {
        this.admin = true;
      }
    });
  }
  onDetail() {
    this.router.navigate([`${this.productId}`], { relativeTo: this.route });
  }
  onCart() {
    if(!this.products.active){
      alert("This product is not available for purchasing")
    }
     else{
    this.store.dispatch(new ShoppingCartActions.AddProductToCart(this.products));
    }
  }
  onDelete() {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new ProductActions.DeleteProducts(this.productId));
    }
  }
  onUpdate() {
    this.router.navigate([`${this.productId}/edit`], { relativeTo: this.route });
  }
}
