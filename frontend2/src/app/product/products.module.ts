import { ProductsService } from './products-service';
import { SharedModule } from './../shared/shared.module';
import { ProductEditComponent } from './products-edit/products-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductSliderComponent } from './products-slider/products-slider.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './products.component';
import { ProductDetailComponent } from './products-detail/products-detail.component';
import { ProductListComponent } from './products-list/products-list.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core.module';
// import { ProductSliderDotsComponent } from './products-slider-dots/products-slider-dots.component';
import { ProductsItemsComponent } from './products-list/products-items/products-items.component';
import { ProductRoutingModule } from './products.routing.module';
import { ProductListingComponent } from './products-list/admin-product-listing.component.ts/product-listing.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductsItemsComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductListingComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ProductRoutingModule,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
