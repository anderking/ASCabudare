import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/index";
import { AuthTokenGuard } from "@services/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: 'Dashboard',
    children: [
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
    canActivate: [AuthTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
