import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
  id: string;
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
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.inItForm();
    });
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new ProductsActions.UpdateProducts({
          index: this.id,
          newProduct: this.productForm.value,
        })
      );
    } else {
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
    let mainImage = '';
    let productPrice;
    let productDiscountPrice;
    let productRating;
    let productStock;
    let productTotalStock;
    if (this.editMode) {
      this.storeSub = this.store
        .select('products')
        .pipe(
          map((productsState) => {
            return productsState.products.find((product) => {
              return product.id === this.id;
            });
          })
        )
        .subscribe((product) => {
          if (product !== undefined) {
            productName = product.name;
            productDesc = product.description;
            productCategory = product.category;
            productBrand = product.brand;
            mainImage = product.mainImage;
            productPrice = product.price;
            productDiscountPrice = product.discountPrice;
            productStock = product.stock;
          }
        });
    }
    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      description: new FormControl(productDesc, Validators.required),
      category: new FormControl(productCategory, Validators.required),
      brand: new FormControl(productBrand, Validators.required),
      mainImage: new FormControl(mainImage, [
        Validators.required,
        this.validateMainImage,
      ]),
      price: new FormControl(productPrice, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      discountPrice: new FormControl(productDiscountPrice, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      stock: new FormControl(productStock, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  validateMainImage(control: FormControl) {
    const file = control.value;
    if (file) {
      const fileType = file.type;
      if (fileType !== 'image/jpeg') {
        return { invalidFileType: true };
      }
      const fileSize = file.size;
      if (fileSize > 1 * 1024 * 1024) {
        return { invalidFileSize: true };
      }
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      return new Promise((resolve) => {
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          window.URL.revokeObjectURL(img.src);
          if (width < 300 || height < 300) {
            resolve({ invalidImageSize: true });
          } else {
            resolve(null);
          }
        };
      });
    } else {
      return null;
    }
  }
}
