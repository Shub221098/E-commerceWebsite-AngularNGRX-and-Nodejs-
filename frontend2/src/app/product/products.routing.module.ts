import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products-detail/products-detail.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { ProductComponent } from './products.component';
import { ProductEditComponent } from './products-edit/products-edit.component';
import { RoleGuard } from '../auth/role.guard';
import { RecipeResolver } from './products.resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  { path: 'edit/:id', component: ProductEditComponent ,resolve: [RecipeResolver]},
  { path: 'new',component: ProductEditComponent},
  { path: ':id', component: ProductDetailComponent, resolve: [RecipeResolver], },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
