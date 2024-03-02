import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PayComponent } from "./pay.component";
import { PaysComponent } from "./pays/pays.component";
import { PayFormComponent } from "./pay-form/pay-form.component";

export const routes: Routes = [
  {
    path: "",
    component: PayComponent,
    title: 'Pays',
    canActivate: [],
    children: [
      { path: "", component: PaysComponent },
      { path: "form", component: PayFormComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayRoutingModule {}
