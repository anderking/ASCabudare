import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthTokenGuard } from "@services/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "pay", pathMatch: "full" },
      {
        path: "pay",
        loadChildren: () =>
          import("./components/pay/pay.module").then((m) => m.PayModule),
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
export class ManagementRoutingModule {}
