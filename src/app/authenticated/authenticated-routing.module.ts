import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticatedComponent } from "./authenticated.component";

const routes: Routes = [
  {
    path: "",
    component: AuthenticatedComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadChildren: () =>
          import("./components/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "management",
        loadChildren: () =>
          import("./components/management/management.module").then(
            (m) => m.ManagementModule
          ),
      },
      {
        path: "configuration",
        loadChildren: () =>
          import("./components/configuration/configuration.module").then(
            (m) => m.ConfigurationModule
          ),
      },
      {
        path: "authorization",
        loadChildren: () =>
          import("./components/authorization/authorization.module").then(
            (m) => m.AuthorizationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}
