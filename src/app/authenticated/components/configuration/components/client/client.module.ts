import { NgModule } from "@angular/core";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { ClientsComponent } from "./clients/clients.component";
import { ClientCreateComponent } from "./client-form/client-form.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    ClientComponent,
    ClientsComponent,
    ClientCreateComponent,
  ],
  imports: [ClientRoutingModule, SharedModule],
})
export class ClientModule {}
