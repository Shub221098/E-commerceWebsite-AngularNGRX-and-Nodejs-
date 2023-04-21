import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartContainerComponent } from './shopping-cart-container/shopping-cart-container.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartPageComponent } from './shopping-cart-page.component';
import { AuthGuard } from '../auth/auth.guard';
import { ShoppingCartItemsComponent } from './shopping-cart-container/shopping-cart-items.component.ts/shopping-cart-items.component';

@NgModule({
  declarations: [ShoppingCartContainerComponent, ShoppingCartPageComponent, ShoppingCartItemsComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', canActivate: [AuthGuard], component: ShoppingCartPageComponent }]),
    SharedModule,
  ],
})
export class ShoppingCartModule {}
