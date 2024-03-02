import { NgModule } from "@angular/core";
import { PublicRoutingModule } from "./public-routing.module";
import { SharedModule } from "@root/shared/shared.module";
import { PublicComponent } from "./public.component";
import { PayComponent } from "./pay/pay.component";


@NgModule({
  declarations: [
    PublicComponent,
    PayComponent,
  ],
  imports: [SharedModule, PublicRoutingModule],
})
export class PublicModule {}
