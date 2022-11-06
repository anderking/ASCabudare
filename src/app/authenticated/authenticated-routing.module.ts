import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "@root/shared/container/container.component";
import { AuthVerifyEmailtGuard } from "@services/guard/auth-verify-email.guard";
import { AuthGuard } from "@services/guard/auth.guard";

const routes: Routes = [
  {
    path: "authenticated",
    component: ContainerComponent,
    canActivate: [AuthGuard, AuthVerifyEmailtGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadChildren: () =>
          import("./components/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "configuration",
        loadChildren: () =>
          import("./components/configuration/configuration.module").then(
            (m) => m.ConfigurationModule
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
