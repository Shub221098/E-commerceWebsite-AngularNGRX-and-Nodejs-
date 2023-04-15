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
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
// {
//   path: 'shopping-list',
//   // loadChildren: () =>
//   //   import('./shopping-cart-page/shopping-cart-page.module').then(
//   //     (m) => m.ShoppingListModule
//   //   ),
// },
export class AppRoutingModule {}
