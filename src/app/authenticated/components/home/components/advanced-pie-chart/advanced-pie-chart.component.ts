import { Component, Input, OnChanges } from "@angular/core";
import { PayModel } from "@models/management/pay.model";
import { SingleModel } from "@models/shared/dashboard.model";
import { GroupModel } from "@models/shared/group.model";

@Component({
  selector: "app-advanced-pie-chart",
  templateUrl: "./advanced-pie-chart.component.html",
})
export class AdvancePieChartComponent implements OnChanges {
  @Input() items: GroupModel<PayModel>[] = [];
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
    if (this.items.length > 0) {
      let items: SingleModel[] = this.buildElements(this.items);
      this.multi = items;
    } else {
      this.multi = [];
    }
  }

  private buildElements(items: GroupModel<PayModel>[]): SingleModel[] {
    let single: SingleModel[] = [];
    items.forEach((element) => {
      let acumValues = 0;
      element.values.forEach((value: PayModel) => {
        acumValues += value.amount;
      });
      let newSingle: SingleModel = {
        name: element.name,
        value: acumValues,
      };
      single.push(newSingle);
    });
    return single;
  }
}
