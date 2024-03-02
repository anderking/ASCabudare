import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicComponent } from "./public.component";
import { PayComponent } from "./pay/pay.component";

export const routes: Routes = [
  {
    path: "",
    component: PublicComponent,
    children: [
      { path: "", redirectTo: "pay", pathMatch: "full" },
      { path: "pay", component: PayComponent, title: "Pay" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
