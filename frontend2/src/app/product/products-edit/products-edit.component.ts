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
import { getBrand, getCategories } from '../store/products.selector';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  productForm: FormGroup;
  categories : string[]
  brands : string[]
  productImages = new FormArray<any>([]);
  imageURL : string
  catSub : Subscription;
  brandSub : Subscription;
  storeSub: Subscription;

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
    this.catSub = this.store.select(getCategories).subscribe((category) => {
      this.categories = category
      console.log(this.categories)
    })
    this.brandSub = this.store.select(getBrand).subscribe((brand) => {
      this.brands = brand
    })
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
        this.validateImage
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

  validateImage(control: FormControl) {
    const file = control.value;
    if (file) {
      const fileType = file.type;
      if (fileType !== 'image/jpeg' || fileType !== 'image/jpg' || fileType !== 'image/png') {
        return { invalidFileType: true };
      }
      const fileSize = file.size;
      if (fileSize > 1 * 1024 * 1024) {
        return { invalidFileSize: true };
      }
    }
    return null;
  }
  showPreview(event: any) {
    const file = event.target?.files?.[0];
    if (!file) {
      return;
    }
    this.productForm.patchValue({
      image: file
    });
    this.productForm.get('image')?.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
      this.catSub.unsubscribe();
      this.brandSub.unsubscribe();
    }
  }
}
