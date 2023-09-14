import { NgModule } from "@angular/core";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { ClientsComponent } from "./clients/clients.component";
import { ClientFormComponent } from "./client-form/client-form.component";
import { SharedModule } from "@root/shared/shared.module";
import { ClientShowComponent } from "./client-show/client-show.component";

@NgModule({
  declarations: [
    ClientComponent,
    ClientsComponent,
    ClientFormComponent,
    ClientShowComponent
  ],
  imports: [ClientRoutingModule, SharedModule],
})
export class ClientModule {}
