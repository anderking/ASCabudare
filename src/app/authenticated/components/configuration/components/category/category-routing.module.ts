import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryFormComponent } from "./category-form/category-form.component";

export const routes: Routes = [
  {
    path: "",
    component: CategoryComponent,
    title: 'Category',
    canActivate: [],
    children: [
      { path: "", component: CategoriesComponent },
      { path: "form", component: CategoryFormComponent },
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
