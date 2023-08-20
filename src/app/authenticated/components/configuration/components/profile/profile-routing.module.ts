import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ProfileUpdateComponent } from "./profile-form/profile-form.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    canActivate: [],
    children: [
      { path: "", component: ProfileUpdateComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
