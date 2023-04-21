import * as ProductActions from './../store/products.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../products.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as ShoppingListActions from 'src/app/shop/store/shopping-list.action';
import { Shop } from 'src/app/shop/shop.model';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Products;
  id: string;
  cart : Shop
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
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
      this.store.select('shop').pipe(map((shopState) => shopState)).subscribe((cart) => console.log(cart))
  }
  onDecrementCartItem() {
    console.log('Decrement');
    this.store.dispatch(new ShoppingListActions.DecrementItemQuantity(this.id));
  }
  onIncrementCartItem() {
    console.log('Increment');
    this.store.dispatch(new ShoppingListActions.IncrementItemQuantity(this.id));
  }
  onAddProductToCart(): void {

    this.store.dispatch(new ShoppingListActions.AddProductToCart(this.product));
  }
  // onEditRecipe() {
  //   this.router.navigate(['edit'], { relativeTo: this.route });
  // }
  // onDeleteRecipe() {
  //   // this.recipesService.deleteRecipe(this.id);
  //   this.store.dispatch(new ProductActions.DeleteProducts(this.id));
  //   this.router.navigate(['/products']);
  // }
}
