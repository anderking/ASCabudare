import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { CategorysComponent } from "./categorys/categorys.component";
import { CategoryCreateComponent } from "./category-form/category-form.component";

export const routes: Routes = [
  {
    path: "",
    component: CategoryComponent,
    canActivate: [],
    children: [
      { path: "", component: CategorysComponent },
      { path: "form", component: CategoryCreateComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
