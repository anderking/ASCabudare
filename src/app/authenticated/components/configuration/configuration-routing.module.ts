import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      {
        path: "category",
        loadChildren: () =>
          import("./components/category/category.module").then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: "client",
        loadChildren: () =>
          import("./components/client/client.module").then(
            (m) => m.ClientModule
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
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
