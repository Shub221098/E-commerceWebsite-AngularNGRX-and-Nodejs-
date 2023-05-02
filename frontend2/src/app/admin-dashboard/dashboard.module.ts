import { DashboardComponent } from './../admin-dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard'
import { SharedModule } from '../shared/shared.module';
import { DashboardService } from './dashboard.service';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild([
      { path: '', canActivate: [AuthGuard], component: DashboardComponent },
    ]),
    SharedModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
