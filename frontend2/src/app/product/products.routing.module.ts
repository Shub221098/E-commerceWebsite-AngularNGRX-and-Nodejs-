import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products-detail/products-detail.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { ProductComponent } from './products.component';
import { ProductEditComponent } from './products-edit/products-edit.component';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: ProductComponent,
    children: [{ path: 'edit', component: ProductEditComponent },]
  },

  { path: ':id', component: ProductDetailComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
