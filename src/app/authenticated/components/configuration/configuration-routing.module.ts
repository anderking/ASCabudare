import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthTokenGuard } from "@services/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      {
        path: "profile",
        loadChildren: () =>
          import("./components/profile/profile.module").then(
            (m) => m.ProfileModule
          ),
        canActivate: [AuthTokenGuard],
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
