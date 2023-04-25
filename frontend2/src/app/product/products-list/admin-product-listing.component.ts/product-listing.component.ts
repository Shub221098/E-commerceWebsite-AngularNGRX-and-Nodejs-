import { AddProductToCart } from '../../../shop/store/shopping-list.action';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromApp from '../../../store/app.reducer';
import { Products } from '../../products.model';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/products.action';
@Component({
  selector: 'app-products-listing',
  templateUrl: './product-listing.component.html',
})
export class ProductListingComponent {
  @Input() products: Products[];
  index: number;
  productId: string;
  category: string;
  message: string;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {}
  onDelete() {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new ProductActions.DeleteProducts(this.productId));
    }
  }
  onUpdate() {
    this.router.navigate([`${this.productId}/edit`], {
      relativeTo: this.route,
    });
  }
}
