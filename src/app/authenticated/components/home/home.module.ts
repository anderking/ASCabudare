import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "@root/shared/shared.module";
import {
  HomeComponent,
  DashboardComponent,
  AdvancePieChartComponent,
} from "./components/index";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    AdvancePieChartComponent
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgxChartsModule],
})
export class HomeModule {}
