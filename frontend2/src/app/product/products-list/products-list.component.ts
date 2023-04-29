import { getBrand } from './../store/products.selector';
import { getAuthenticate, getRole } from './../../auth/store/auth.selector';
import { Products } from './../products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products-service';
import { getCategories } from '../store/products.selector';
import { ToastrService } from 'ngx-toastr';

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
  categories: string[];
  brands: string[];
  clearFilter: boolean = false;
  productSub: Subscription;
  categorySub: Subscription;
  brandSub: Subscription;
  admin: boolean;
  filteredBy = '';
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.searchStr = '';
    this.filteredBy = '';
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
            this.products = product
          }
        });
    this.categorySub = this.store
      .select(getCategories)
      .subscribe((category) => (this.categories = category));
    this.brandSub = this.store
      .select(getBrand)
      .subscribe((brand) => (this.brands = brand));
  }
  lastAdded() {
    this.productService
      .searchProduct('', this.filteredBy)
      .subscribe((product) => Object.assign(this.products, product));
  }
  sortByPrice(order: string) {
    if (order === 'asc') {
      this.productService
        .searchProduct(order, this.filteredBy)
        .subscribe((product) => Object.assign(this.products, product));
    } else {
      this.productService
        .searchProduct(order, this.filteredBy)
        .subscribe((product) => Object.assign(this.products, product));
    }
  }

  filterProductsByCategory(search: string) {
    this.clearFilter = true;
    this.filteredBy = search;
    this.productService
      .searchProduct('', this.filteredBy)
      .subscribe((product: any) => (this.products = product));
  }
  filterProductsByBrand(search: string) {
    this.clearFilter = true;
    this.filteredBy = search;
    this.productService
      .searchProduct('', this.filteredBy)
      .subscribe((product: any) => (this.products = product));
  }
  onSearch() {
    const search = this.searchStr.toLowerCase().replaceAll(' ', '');
    this.filteredBy = search;
    if (this.searchStr !== '') {
      this.productService
        .searchProduct('', search)
        .subscribe((product: any) => (this.products = product));
    } else {
      this.showWarning('Search product by category, name or brand');
    }
  }

  clear() {
    this.clearFilter = false;
    this.ngOnInit();
  }
  showWarning(message: string) {
    this.toastr.warning(message);
  }
  ngOnDestroy() {
    this.categorySub.unsubscribe();
    this.brandSub.unsubscribe();
  }
}
