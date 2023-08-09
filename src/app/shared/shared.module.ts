import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { ContainerComponent } from "./container/container.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PipesModule } from "@root/core/pipes/pipes-module.module";
import { NgBoostrapModule } from "@root/core/ui/ng-bootstrap.module";
import { ToastContainerComponent } from "./toast-container/toast-container.component";
import { TranslateModule } from "@ngx-translate/core";
import { CurrentFilterComponent } from "./current-filter/current-filter.component";
import { ModalComponent } from "./modal/modal.component";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faTrash,
  faCalendarCheck,
  faGauge,
  faTags,
  faUsers,
  faMoneyBillTransfer,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
  faMoon,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AmountPipe } from "@root/core/pipes/amount.pipe";
import { MillionPipe } from "@root/core/pipes/million.pipe";

@NgModule({
  declarations: [
    NavbarComponent,
    ContainerComponent,
    ToastContainerComponent,
    ModalComponent,
    CurrentFilterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgBoostrapModule,
    TranslateModule,
    FontAwesomeModule,
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
    ModalComponent,
    CurrentFilterComponent,
  ],
  providers: [DecimalPipe, AmountPipe, MillionPipe],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faArrowRight,
      faArrowLeft,
      faTrash,
      faCalendarCheck,
      faGauge,
      faTags,
      faUsers,
      faMoneyBillTransfer,
      faGear,
      faRightFromBracket,
      faBars,
      faXmark,
      faMoon,
      faLanguage
    );
  }
}
