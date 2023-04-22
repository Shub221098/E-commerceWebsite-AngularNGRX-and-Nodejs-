import { getAuthenticate, getRole } from './../../auth/store/auth.selector';
import { Products } from './../products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products-service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Products[];
  searchStr: string;
  search: string = '';
  userSub: Subscription;
  category: string;
  productSub: Subscription;
  admin: boolean;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}
  filteredBy = '';
  filteredType = '';
  sortOrder = 1;
  ngOnInit() {
    console.log('Calling ngOninit');
    this.searchStr = '';
    this.filteredBy = '';
    this.filteredType = '';
    this.sortOrder = 1;
    (this.userSub = this.store.select(getRole).subscribe((role) => {
      if (role === 'admin') {
        console.log(role);
        this.admin = true;
      }
    })),
      this.route.queryParams
        .pipe(
          map((params) => {
            return params['category'];
          }),
          switchMap((category) => {
            this.category = category;
            return this.store.select('products');
          }),
          map((productsState) =>
            productsState.products.filter((product) => {
              if (this.category) {
                console.log(this.category);
                return product.category === this.category;
              } else {
                return product;
              }
            })
          )
        )
        .subscribe((product) => {
          console.log(product);
          if (product !== undefined) {
            this.products = product;
          }
        });
  }
  lastAdded() {
    this.productService
      .getProductsLastAdded(this.filteredBy, this.filteredType)
      .subscribe((product) => Object.assign(this.products, product));
  }
  sortByPrice(order: string) {
    if (order === 'asc') {
      this.sortOrder = 1;
      this.productService
        .getProducts(this.sortOrder, this.filteredBy, this.filteredType)
        .subscribe((product) => Object.assign(this.products, product));
    } else {
      this.sortOrder = -1;
      this.productService
        .getProducts(this.sortOrder, this.filteredBy, this.filteredType)
        .subscribe((product) => Object.assign(this.products, product));
    }
  }

  filterProductsByCategory(order: string) {
    this.filteredBy = order;
    this.filteredType = 'category';
    this.productService
      .getFilterProductsByCategory(order, this.sortOrder)
      .subscribe((product: any) => (this.products = product));
  }
  filterProductsByBrand(order: string) {
    this.filteredBy = order;
    this.filteredType = 'brand';
    this.productService
      .getFilterProductsByBrand(order, this.sortOrder)
      .subscribe((product: any) => (this.products = product));
  }
  onSearch() {
    let catFound = this.products.find(
      (value) => value.category == this.searchStr
    );
    console.log(catFound, 'sadhofisadfnova');
    let brFound = this.products.find((value) => value.brand == this.searchStr);
    console.log(brFound);
    let nmFound = this.products.find((value) => value.name == this.searchStr);
    console.log(nmFound);
    let searchType = '';
    if (catFound) {
      searchType = 'category';
    } else if (nmFound) {
      searchType = 'name';
    } else {
      searchType = 'brand';
    }
    this.productService
      .searchProduct(searchType, this.searchStr)
      .subscribe((product: any) => (this.products = product));
  }
  onExist(e: any) {
    this.search = this.search + e.key.toLowerCase();
    this.search = this.search.replaceAll(' ', '');
    if (e.key) {
      this.products = this.products.filter((product) => {
        const name = product.name.toLowerCase().replaceAll(' ', '');
        return name.startsWith(this.search) && product;
      });
    }
    if (e.key === 'Backspace' || e.keyCode === 8) {
      // console.log(this.searchStr, " Heloosdfasdfsafadf")
      if (this.searchStr === '') {
        console.log(this.searchStr, ' Heloosdfasdfsafadf');
        this.clear();
      }
    }
  }
  clear() {
    this.ngOnInit();
  }
}
