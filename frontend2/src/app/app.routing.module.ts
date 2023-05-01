import { OrdersModule } from './orders/order.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
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
    path: 'shop',
    loadChildren: () =>
      import('./shop/shopping-cart.module').then((m) => m.ShoppingCartModule),
    },
    {
      path: 'dashboard',
      loadChildren: () =>
      import('./admin-dashboard/dashboard.module').then(
        (m) => m.DashboardModule
        ),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
      
      {
        path: 'orders',
        loadChildren: () =>
        import('./orders/order.module').then((m) => m.OrdersModule),
      },
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
    ];
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
