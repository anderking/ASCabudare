import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryRoutingModule } from "./category-routing.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CategoryComponent } from "./category.component";
import { CategorysComponent } from "./categorys/categorys.component";
import { CategoryCreateComponent } from "./category-form/category-form.component";
import { TokenInterceptorService } from "src/app/core/services/token-interceptor.service";
import { NgBoostrapModule } from "src/app/core/ui/ng-bootstrap.module";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    CategoryComponent,
    CategorysComponent,
    CategoryCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    NgBoostrapModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class CategoryModule {}
