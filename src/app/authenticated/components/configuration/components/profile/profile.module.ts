import { NgModule } from "@angular/core";
import { SharedModule } from "@root/shared/shared.module";
import { ProfileComponent } from "./profile.component";
import { ProfileUpdateComponent } from "./profile-form/profile-form.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
  declarations: [ProfileComponent, ProfileUpdateComponent],
  imports: [ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
