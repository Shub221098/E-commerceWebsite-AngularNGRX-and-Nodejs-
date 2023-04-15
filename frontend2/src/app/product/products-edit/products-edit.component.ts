import * as ProductsActions from '../store/products.action';
import { AppState } from './../../store/app.reducer';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Products } from '../products.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  productForm: FormGroup;
  private storeSub : Subscription
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store : Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.editMode = params['id'] != null;
    //   this.inItForm();
    });
  }
  ngOnDestroy(){
    if(this.storeSub){
      this.storeSub.unsubscribe()
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onSubmit() {
    if (this.editMode) {
      // this.recipesService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new ProductsActions.UpdateProducts({index : this.id, newRecipe : this.productForm.value}))
    } else {
      // this.recipesService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new ProductsActions.AddProducts(this.productForm.value));
    }
    this.onCancel()
  }
      
    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required);
      description: new FormControl(productDesc, Validators.required),
      category: new FormControl(productCategory, Validators.required),
      brand: new FormControl(productBrand, Validators.required),
      mainImage: new FormControl(mainimagePath, Validators.required),
      images: new FormControl(imagesPath, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      discountPrice: new FormControl(productDiscountPrice, Validators.required),
      rating: new FormControl(productRating, Validators.required),
      stock: new FormControl(productStock, Validators.required),
      totalStock: new FormControl(productTotalStock, Validators.required),
    });
  }
}
