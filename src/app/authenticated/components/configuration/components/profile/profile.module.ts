import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "src/app/core/services/token-interceptor.service";
import { NgBoostrapModule } from "src/app/core/ui/ng-bootstrap.module";
import { SharedModule } from "@root/shared/shared.module";
import { ProfileComponent } from "./profile.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
  declarations: [ProfileComponent, ProfileUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    NgBoostrapModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class ProfileModule {}
