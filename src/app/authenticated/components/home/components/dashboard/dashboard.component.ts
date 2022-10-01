import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Label } from "ng2-charts";
import { ChartType } from "chart.js";
import { filter, tap } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  public items: IngresoEgresoModel[] = [];
  public isLoading: boolean;

  public totalIngresos: any;
  public totalEgresos: any;
  public cantIngresos: any;
  public cantEgresos: any;

  public pieChartLabels: Label[] = ["Ingresos", "Egresos"];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartColors = [
    {
      backgroundColor: ["rgba(40, 167, 69, 1)", "rgba(220, 53, 69, 1)"],
    },
  ];

  private _subcriptionStadistic: Subscription = new Subscription();
  private _subscriptionLoading: Subscription = new Subscription();

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

  ngOnInit() {
    this._sharedFacadeService.getLoading$().subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this._ingresoEgresoFacadeService
      .getAll$()
      .pipe(
        filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
        tap((items: IngresoEgresoModel[]) => console.log(items))
      )
      .subscribe((items: IngresoEgresoModel[]) => {
        this.items = items;
        if (this.items) {
          this.calculate(this.items);
        }
      });
  }

  calculate(items: IngresoEgresoModel[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.cantIngresos = 0;
    this.cantEgresos = 0;
    items.forEach((item) => {
      if (item.idTypeActive == "ingreso") {
        this.totalIngresos += item.amount;
        this.cantIngresos++;
      }

      if (item.idTypeActive == "egreso") {
        this.totalEgresos += item.amount;
        this.cantEgresos++;
      }
    });
    this.pieChartData = [this.totalIngresos, this.totalEgresos];
  }

  ngOnDestroy(): void {
    this._subcriptionStadistic.unsubscribe();
    this._subscriptionLoading.unsubscribe();
  }
}
