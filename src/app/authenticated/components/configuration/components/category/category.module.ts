import { NgModule } from "@angular/core";
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";
import { CategorysComponent } from "./categorys/categorys.component";
import { CategoryCreateComponent } from "./category-form/category-form.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    CategoryComponent,
    CategorysComponent,
    CategoryCreateComponent,
  ],
  imports: [CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
