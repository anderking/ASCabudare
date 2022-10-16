import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRedirectGuard } from '../core/services/guard/auth-redirect.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [

  {
    path: '', component: AuthComponent, canActivate: [AuthRedirectGuard],
    children:
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
