import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../store/products.action';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  productForm: FormGroup;
  productImages = new FormArray<any>([]);
  private storeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.inItForm();
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new ProductsActions.UpdateProducts({
          index: this.id,
          newRecipe: this.productForm.value,
        })
      );
    } else {
      // this.recipesService.addRecipe(this.recipeForm.value);
      console.log(this.productForm.value);
      this.store.dispatch(
        new ProductsActions.AddProducts(this.productForm.value)
      );
    }
    this.onCancel();
  }
  private inItForm() {
    let productName = '';
    let productDesc = '';
    let productCategory = '';
    let productBrand = '';
    let mainImagePath = '';
    let productPrice;
    let productDiscountPrice;
    let productRating;
    let productStock;
    let productTotalStock;
    if (this.editMode) {
      this.storeSub = this.store.select('products').pipe(map(productsState => {
        return productsState.products.find((product, index) => {
          return index === this.id
        })
      })).subscribe(product => {
        if(product !== undefined){
        productName = product.name;
        productDesc = product.description;
        productCategory = product.category;
        productBrand = product.brand;
        mainImagePath = product.mainImage;
        productPrice = product.price;
        productDiscountPrice = product.discountPrice;
        productRating = product.rating;
        productStock = product.stock;
        productTotalStock = product.totalStock;
      }})
    }
    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      description: new FormControl(productDesc, Validators.required),
      category: new FormControl(productCategory, Validators.required),
      brand: new FormControl(productBrand, Validators.required),
      mainImage: new FormControl(mainImagePath, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      discountPrice: new FormControl(productDiscountPrice, Validators.required),
      rating: new FormControl(productRating, Validators.required),
      stock: new FormControl(productStock, Validators.required),
      totalStock: new FormControl(productTotalStock, Validators.required),
    });
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
