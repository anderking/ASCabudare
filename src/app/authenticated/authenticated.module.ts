import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthenticatedRoutingModule } from "./authenticated-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthenticatedComponent } from "./authenticated.component";

@NgModule({
  declarations: [AuthenticatedComponent],
  imports: [CommonModule, AuthenticatedRoutingModule, SharedModule],
})
export class AuthenticatedModule {}
