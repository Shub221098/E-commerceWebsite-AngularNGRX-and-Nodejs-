import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './user.component';
import { UsersService } from './user.service';
@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', canActivate: [AuthGuard], component: UsersComponent },
    ]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
