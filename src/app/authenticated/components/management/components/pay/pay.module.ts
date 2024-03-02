import { NgModule } from "@angular/core";
import { PayRoutingModule } from "./pay-routing.module";
import { PayComponent } from "./pay.component";
import { PaysComponent } from "./pays/pays.component";
import { PayFormComponent } from "./pay-form/pay-form.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    PayComponent,
    PaysComponent,
    PayFormComponent,
  ],
  imports: [PayRoutingModule, SharedModule],
})
export class PayModule {}
