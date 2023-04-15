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
import { PaginationModule } from "../shared/pagination/pagination.module";
import { ProductRoutingModule } from './products.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ProductComponent,
        ProductDetailComponent,
        // ProductSliderComponent,
        // ProductSliderDotsComponent,
        ProductsItemsComponent,
        ProductListComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        RouterModule,
        PaginationModule,
        ProductRoutingModule 
    ]
})
export class ProductsModule {}
