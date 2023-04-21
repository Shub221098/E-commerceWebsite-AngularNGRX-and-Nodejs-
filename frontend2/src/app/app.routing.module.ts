import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  {
    path: 'categories',
    component: HomeComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'shop', loadChildren: () =>
    import('./shop/shopping-cart.module').then((m) => m.ShoppingCartModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
