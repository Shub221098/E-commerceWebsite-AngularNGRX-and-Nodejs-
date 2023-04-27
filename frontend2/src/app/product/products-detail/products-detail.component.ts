import * as ProductActions from './../store/products.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, createNgModule, Input, OnInit } from '@angular/core';
import { Products } from '../products.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap, Subscription } from 'rxjs';
import * as ShoppingListActions from 'src/app/shop/store/shopping-list.action';
import { OrderItem } from 'src/app/shop/shop.model';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Products;
  id: string;
  outOfStock: boolean;
  cart: OrderItem[];
  productSub: Subscription;
  shopSub: Subscription;
  quantityForm: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productSub = this.route.params
      .pipe(
        map((params) => {
          return params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('products');
        }),
        map((productsState) =>
          productsState.products.find((product) => {
            return product.id === this.id;
          })
        )
      )
      .subscribe((product) => {
        if (product !== undefined) {
          this.product = product;
        }
      });
    this.shopSub = this.store
      .select('shop')
      .pipe(map((shopState) => shopState))
      .subscribe((cart) => console.log(cart));
  }
  onDecrementCartItem() {
    this.store.dispatch(new ProductActions.RemoveQuantity(this.product.id));
  }
  onIncrementCartItem() {
    this.store.dispatch(new ProductActions.AddQuantity(this.product.id));
  }
  onAddProductToCart(): void {
    this.store.dispatch(new ShoppingListActions.AddProductToCart(this.product));
  }

  onChange(event: any) {
    if (+event.target.value > +event?.target.max) {
      this.showWarning(
        `Quantity must not be greater than ${this.product.stock}`
      );
      event.target.value = 1;
    }
  }
  showWarning(message: string) {
    this.toastr.warning(message);
  }
  ngOnDestroy(){
    this.productSub.unsubscribe()
    this.shopSub.unsubscribe()
  }
}
