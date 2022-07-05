import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { IngresoEgreso } from "../../../../../core/models/ingreso-egreso.model";
import { IngresoEgresoService } from "../../../../../core/services/configuration/ingreso-egreso.service";
import { Label } from "ng2-charts";
import { ChartType } from "chart.js";
import { filter, tap } from "rxjs/operators";
import {
  ActivateLoadingAction,
  DeactivateLoadingAction,
} from "src/app/core/store/actions/ui.actions";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  public items: IngresoEgreso[] = [];
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
    private _ingresoEgresoService: IngresoEgresoService,
    private _store: Store<AppState>
  ) {}

  ngOnInit() {
    this._store.dispatch(new ActivateLoadingAction());

    this._subscriptionLoading = this._store.select("ui").subscribe((ui) => {
      this.isLoading = ui.isLoading;
    });

    this._subcriptionStadistic = this._store
      .select("IE")
      .pipe(filter((IE) => IE.items != null))
      .subscribe((IE) => {
        this.items = IE.items;
        if (this.items) {
          this.calculate(this.items);
          this._store.dispatch(new DeactivateLoadingAction());
        }
      });
  }

  calculate(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.cantIngresos = 0;
    this.cantEgresos = 0;
    items.forEach((item) => {
      if (item.type == "ingreso") {
        this.totalIngresos += item.amount;
        this.cantIngresos++;
      }

      if (item.type == "egreso") {
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
