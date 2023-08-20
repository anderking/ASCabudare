import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client.component";
import { ClientsComponent } from "./clients/clients.component";
import { ClientFormComponent } from "./client-form/client-form.component";

export const routes: Routes = [
  {
    path: "",
    component: ClientComponent,
    canActivate: [],
    children: [
      { path: "", component: ClientsComponent },
      { path: "form", component: ClientFormComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
