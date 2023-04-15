import { VerifyEmailComponent } from './verifyEmail/verifyEmail.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';

@NgModule({
  declarations: [AuthComponent, SignupComponent, LoginComponent, ForgotPasswordComponent, VerifyEmailComponent, ResetPasswordComponent],
  imports: [CommonModule, FormsModule, SharedModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule {}
