import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
