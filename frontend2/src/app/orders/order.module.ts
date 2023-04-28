import { OrdersService } from './order.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersComponent } from './order.component';
@NgModule({
  declarations: [OrdersComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', canActivate: [AuthGuard], component: OrdersComponent }]),
    SharedModule,
  ],
  providers : [OrdersService]
})
export class OrdersModule {}