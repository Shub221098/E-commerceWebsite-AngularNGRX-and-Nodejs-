import { Component, Input, OnDestroy, OnInit, ɵresetCompiledComponents } from '@angular/core';
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
  categories: string[];
  brands: string[];
  productImages = new FormArray<any>([]);
  imageURL: any;
  catSub: Subscription;
  brandSub: Subscription;
  storeSub: Subscription;
  file : any
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
      this.categories = category;
      console.log(this.categories);
    });
    this.brandSub = this.store.select(getBrand).subscribe((brand) => {
      this.brands = brand;
    });
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
      // window.location.reload();
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
      console.log(this.productForm.value);
      // this.store.dispatch(
      //   new ProductsActions.AddProducts(this.productForm.value)
      // );
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
    let productStock;
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
            mainImage = product.mainImage
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
        Validators.required
      ]),
      price: new FormControl(productPrice, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      discountPrice: new FormControl(productDiscountPrice, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      stock: new FormControl(productStock, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }
  onImageSelect(event: any) {
    console.log(event)
    const file = event.target.files[0];
    if (!file) return;
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.productForm.get('mainImage')?.setErrors({ invalidFileType: true });
      return;
    }

    // Check file size
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      this.productForm.get('mainImage')?.setErrors({ maxFileSize: true });
      return;
    }
    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result)
      this.imageURL = reader.result;
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
