import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "@root/shared/shared.module";
import {
  HomeComponent,
  DashboardComponent,
  VerticalBarChartComponent,
  GroupedVerticalBarChartComponent,
  AdvancePieChartComponent,
} from "./components/index";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    VerticalBarChartComponent,
    GroupedVerticalBarChartComponent,
    AdvancePieChartComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgxChartsModule],
})
export class HomeModule {}
