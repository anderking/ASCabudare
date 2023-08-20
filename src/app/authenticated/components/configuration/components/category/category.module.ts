import { NgModule } from "@angular/core";
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    CategoryComponent,
    CategoriesComponent,
    CategoryFormComponent,
  ],
  imports: [CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
