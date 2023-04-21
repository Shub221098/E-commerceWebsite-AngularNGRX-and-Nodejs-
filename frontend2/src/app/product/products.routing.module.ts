import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products-detail/products-detail.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { ProductComponent } from './products.component';
import { ProductEditComponent } from './products-edit/products-edit.component';
import { ProductResolver } from './products.resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  { path: ':id/edit', canActivate: [AuthGuard],component: ProductEditComponent ,resolve: [ProductResolver]},
  { path: 'new',canActivate: [AuthGuard],component: ProductEditComponent},
  { path: ':id',component: ProductDetailComponent, resolve: [ProductResolver], },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
