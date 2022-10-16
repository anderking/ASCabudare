import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManagementRoutingModule } from "./management-routing.module";
import { SharedModule } from "../../../shared/shared.module";

import { ManagementComponent } from "./components/index";

@NgModule({
  declarations: [ManagementComponent],
  imports: [CommonModule, ManagementRoutingModule, SharedModule],
  providers: [],
})
export class ManagementModule {}
