import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '@root/core/pipes/pipes-module.module';
import { NgBoostrapModule } from '@root/core/ui/ng-bootstrap.module';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
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
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ContainerComponent,
    ToastContainerComponent,
    PipesModule,
    NgBoostrapModule,
  ]
})
export class SharedModule { }
