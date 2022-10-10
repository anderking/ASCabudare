import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../../../shared/shared.module";

import { HomeComponent, DashboardComponent } from "./components/index";

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
