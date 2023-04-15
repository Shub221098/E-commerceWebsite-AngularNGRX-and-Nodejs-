import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verifyEmail/verifyEmail.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'verifyEmail/:token',
        component: VerifyEmailComponent,
      },
      {
        path: 'forgetPassword',
        component: ForgotPasswordComponent,
      },
      {
        path: 'resetPassword/:token',
        component: ResetPasswordComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
