import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LendingComponent } from "./lending.component";
import { LendingsComponent } from "./lendings/lendings.component";
import { LendingFormComponent } from "./lending-form/lending-form.component";

export const routes: Routes = [
  {
    path: "",
    component: LendingComponent,
    title: 'Lending',
    canActivate: [],
    children: [
      { path: "", component: LendingsComponent },
      { path: "form", component: LendingFormComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendingRoutingModule {}
