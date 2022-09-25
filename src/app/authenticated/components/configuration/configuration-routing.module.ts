import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfigurationComponent } from "./configuration.component";
import { AuthGuard } from "../../../core/services/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ConfigurationComponent,
    children: [
      { path: "", component: ConfigurationComponent },
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

  { path: "", component: ConfigurationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
