import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "ingreso-egreso", pathMatch: "full" },
      {
        path: "ingreso-egreso",
        loadChildren: () =>
          import("./components/ingreso-egreso/ingreso-egreso.module").then(
            (m) => m.IngresoEgresoModule
          ),
      },
      {
        path: "lending",
        loadChildren: () =>
          import("./components/lending/lending.module").then(
            (m) => m.LendingModule
          ),
      },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
