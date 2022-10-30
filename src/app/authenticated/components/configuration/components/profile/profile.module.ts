import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
  ]
})
export class ProfileModule {}
