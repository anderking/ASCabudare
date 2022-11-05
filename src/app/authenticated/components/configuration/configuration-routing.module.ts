import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      {
        path: "ingreso-egreso",
        loadChildren: () =>
          import("./components/ingreso-egreso/ingreso-egreso.module").then(
            (m) => m.IngresoEgresoModule
          ),
      },
      {
        path: "category",
        loadChildren: () =>
          import("./components/category/category.module").then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./components/profile/profile.module").then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
