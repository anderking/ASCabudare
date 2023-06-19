import { Component, Input, OnChanges } from "@angular/core";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { MultiModel, SingleModel } from "@models/shared/dashboard.model";
import { GroupModel } from "@models/shared/group.model";

@Component({
  selector: "app-grouped-vertical-bar-chart",
  templateUrl: "./grouped-vertical-bar-chart.component.html",
  styleUrls: ["./grouped-vertical-bar-chart.component.scss"],
})
export class GroupedVerticalBarChartComponent implements OnChanges {
  @Input() items: GroupModel<GroupModel<IngresoEgresoModel>>[] = [];
  single: SingleModel[];
  multi: MultiModel[];
  view: any[] = [400, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  yAxisLabel = "Montos"
  xAxisLabel = "Tipo"
  colorScheme = {
    domain: ["#1cc88a", "#e74a3b", "#c7ebf1", "#fbe6b1"],
  };

  constructor() {}

  ngOnChanges(): void {
    if (this.items) {
      this.buildChartItems();
    }
  }

  private buildChartItems(): void {
    let multi: MultiModel[] = [];
    this.items.forEach(
      (element: GroupModel<GroupModel<IngresoEgresoModel>>) => {
        let categories: SingleModel[] = this.categories(element.values);
        let newMulti: MultiModel = {
          name: element.name,
          series: categories,
        };
        multi.push(newMulti);
      }
    );
    this.multi = multi;
    console.log(this.multi);
  }

  private categories(
    categories: GroupModel<IngresoEgresoModel>[]
  ): SingleModel[] {
    let single: SingleModel[] = [];
    categories.forEach((category) => {
      let acumValues = 0;
      category.values.forEach((value: IngresoEgresoModel) => {
        acumValues += value.amount;
      });
      let newSingle: SingleModel = {
        name: category.name,
        value: acumValues,
      };
      single.push(newSingle);
    });
    return single;
  }
}
