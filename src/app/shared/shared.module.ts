import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ModalsComponent } from './modals/modals.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '@root/core/pipes/pipes-module.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ModalsComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ModalsComponent,
    ContainerComponent,
    PipesModule,
  ]
})
export class SharedModule { }
