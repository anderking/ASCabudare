import { NgModule } from "@angular/core";
import { LendingRoutingModule } from "./lending-routing.module";
import { LendingComponent } from "./lending.component";
import { LendingsComponent } from "./lendings/lendings.component";
import { LendingFormComponent } from "./lending-form/lending-form.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [LendingComponent, LendingsComponent, LendingFormComponent],
  imports: [LendingRoutingModule, SharedModule],
})
export class LendingModule {}
