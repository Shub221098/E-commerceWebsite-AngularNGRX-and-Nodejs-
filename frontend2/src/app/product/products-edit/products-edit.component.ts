import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ɵresetCompiledComponents,
} from '@angular/core';
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
  styleUrls: ['./products-edit.component.css'],
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
  file: any;
  //isme esa ho rha h ki usko req.file.filename nai mil rha hoga
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
  //ni
  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.editMode) {
      let formData = new FormData();
      formData.set('name', this.productForm.get('name')?.value);
      formData.set('description', this.productForm.get('description')?.value);
      formData.set('category', this.productForm.get('category')?.value);
      formData.set('brand', this.productForm.get('brand')?.value);
      formData.set('price', this.productForm.get('price')?.value);
      formData.set(
        'discountPrice',
        this.productForm.get('discountPrice')?.value
      );
      formData.set('stock', this.productForm.get('stock')?.value);
      console.log(this.file)
      if(this.file){
      formData.append('file', this.file);
      }
      this.store.dispatch(
        new ProductsActions.UpdateProducts({
          index: this.id,
          newProduct: formData,
        })
      );
    } else {
      let formData = new FormData();
      formData.set('name', this.productForm.get('name')?.value);
      formData.set('description', this.productForm.get('description')?.value);
      formData.set('category', this.productForm.get('category')?.value);
      formData.set('brand', this.productForm.get('brand')?.value);
      formData.set('price', this.productForm.get('price')?.value);
      formData.set(
        'discountPrice',
        this.productForm.get('discountPrice')?.value
      );
      formData.set('stock', this.productForm.get('stock')?.value);
      formData.append('file', this.file);
      console.log(formData);
      this.store.dispatch(new ProductsActions.AddProducts(formData));
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
          console.log(product)
          if (product !== undefined) {
            this.imageURL = product.mainImage;
            productName = product.name;
            productDesc = product.description;
            productCategory = product.category;
            productBrand = product.brand;
            productPrice = product.price;
            productDiscountPrice = product.discountPrice;
            productStock = product.stock;
            // mainImage = product.mainImage
          }
        });
    }

    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      description: new FormControl(productDesc, Validators.required),
      category: new FormControl(productCategory, Validators.required),
      brand: new FormControl(productBrand, Validators.required),
      mainImage: new FormControl( [Validators.required]),
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
    this.file = event.target.files[0];
    if (!this.file) return;
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(this.file.type)) {
      this.productForm.get('mainImage')?.setErrors({ invalidFileType: true });
      return;
    }
    // Check file size
    const maxSize = 1024 * 1024; // 1MB
    if (this.file.size > maxSize) {
      this.productForm.get('mainImage')?.setErrors({ maxFileSize: true });
      return;
    }
    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      this.imageURL = reader.result;
    };
    reader.readAsDataURL(this.file);
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
      this.catSub.unsubscribe();
      this.brandSub.unsubscribe();
    }
  }
}
