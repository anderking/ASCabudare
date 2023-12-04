import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NotAllowedComponent } from "./not-allowed/not-allowed.component";
import { NotVerifyComponent } from "./not-verify/not-verify.component";
import { AuthVerifyEmailtRedirectGuard } from "@services/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "", redirectTo: "404", pathMatch: "full" },
      { path: "404", component: NotFoundComponent, title: "Not found" },
      {
        path: "accessdenied",
        component: NotAllowedComponent,
        title: "Access Denied",
      },
      {
        path: "verify-email",
        component: NotVerifyComponent,
        canActivate: [AuthVerifyEmailtRedirectGuard],
        title: "Verify Email",
      },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
