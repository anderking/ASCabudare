import { Component, Input, OnChanges } from "@angular/core";
import { IngresoEgresoModel } from "@models/management/ingreso-egreso.model";
import { SingleModel } from "@models/shared/dashboard.model";
import { GroupModel } from "@models/shared/group.model";

@Component({
  selector: "app-advanced-pie-chart",
  templateUrl: "./advanced-pie-chart.component.html",
})
export class AdvancePieChartComponent implements OnChanges {
  @Input() items: GroupModel<GroupModel<IngresoEgresoModel>>[] = [];
  @Input() type: "";
  @Input() colorScheme = "";
  multi: SingleModel[] = [];
  view: any[] = [1000, 300];
  gradient = false;

  ngOnChanges(): void {
    if (this.items) {
      this.buildChartItems();
    }
  }

  private buildChartItems(): void {
    let items = this.items.filter(
      (element: GroupModel<GroupModel<IngresoEgresoModel>>) =>
        element.name === this.type
    );
    if (items.length > 0) {
      items.forEach((element: GroupModel<GroupModel<IngresoEgresoModel>>) => {
        let categories: SingleModel[] = this.categories(element.values);
        this.multi = categories;
      });
    } else {
      this.multi = [];
    }
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
