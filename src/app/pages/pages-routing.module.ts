import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NotAllowedComponent } from "./not-allowed/not-allowed.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "", redirectTo: "404", pathMatch: "full" },
      { path: "404", component: NotFoundComponent },
      { path: "accessdenied", component: NotAllowedComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
