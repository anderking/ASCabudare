import { Component, Input, OnChanges } from "@angular/core";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { GroupModel } from "@models/shared/group.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-vertical-bar-chart",
  templateUrl: "./vertical-bar-chart.component.html",
  styleUrls: ["./vertical-bar-chart.component.scss"],
})
export class VerticalBarChartComponent implements OnChanges {
  @Input() items: GroupModel<GroupModel<IngresoEgresoModel>>[] = [];
  single: { name: string; value: number }[];
  multi: any[];
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
    domain: [],
  };

  constructor() {
  }

  ngOnChanges(): void {
    console.log(this.items);
    if (this.items) {
      this.buildChartItems();
    }
  }

  private buildChartItems(): void {
    console.log(this.items);
    let single = [];
    let domain: string[] = [];
    this.items.forEach(
      (element: GroupModel<GroupModel<IngresoEgresoModel>>) => {
        let amount = this.amout(element.values);
        let newSingle = {
          name: element.name,
          value: amount,
        };
        single.push(newSingle);

        if (element.name === "Ingreso") {
          domain.push("#1cc88a");
        }
        if (element.name === "Egreso") {
          domain.push("#e74a3b");
        }
      }
    );
    this.colorScheme.domain = domain;
    this.single = single;
  }

  private amout(categories: GroupModel<IngresoEgresoModel>[]): number {
    let acumValues = 0;
    categories.forEach((category) => {
      category.values.forEach((value: IngresoEgresoModel) => {
        acumValues += value.amount;
      });
    });
    return acumValues;
  }
}
