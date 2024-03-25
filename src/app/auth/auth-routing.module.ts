import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthRedirectGuard } from "@services/guard/auth.guard";
import { AuthComponent } from "./auth.component";
import { LoginTimeComponent } from "./login-time/login-time.component";

export const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    canActivate: [AuthRedirectGuard],
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent, title: "Login" },
      { path: "login-time", component: LoginTimeComponent },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        title: "Forgot-pasword",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
