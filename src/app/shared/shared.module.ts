import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { ContainerComponent } from "./container/container.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PipesModule } from "@root/core/pipes/pipes-module.module";
import { NgBoostrapModule } from "@root/core/ui/ng-bootstrap.module";
import { ToastContainerComponent } from "./toast-container/toast-container.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    NavbarComponent,
    ContainerComponent,
    ToastContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgBoostrapModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgBoostrapModule,
    TranslateModule,
    NavbarComponent,
    ContainerComponent,
    ToastContainerComponent,
  ],
})
export class SharedModule {}
