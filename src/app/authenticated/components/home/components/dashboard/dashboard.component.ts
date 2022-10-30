import { Component, OnInit, OnDestroy } from "@angular/core";
import { combineLatest, Subject } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { CategoryModel } from "@models/configurations/category.model";
import { groupByMult } from "@root/core/utilities/core.utilities";
import { GroupModel } from "@models/shared/group.model";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public ingresos_egresos: IngresoEgresoModel[] = [];
  public categories: CategoryModel[] = [];
  public items: GroupModel<IngresoEgresoModel>[] = [];
  public isLoading: boolean;

  public totalIngresos: number;
  public totalEgresos: number;
  public earnings: number;
  public cantIngresos: any;
  public cantEgresos: any;

  public currentUser: CurrentUserModel;

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _categoryFacadeService: CategoryFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService
  ) {}

  ngOnInit() {
    this.chargeIndicatorManager();

    this._ingresoEgresoFacadeService.search();
    this._categoryFacadeService.search();

    const ingresos_egresos$ = this._ingresoEgresoFacadeService.getAll$().pipe(
      filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
      map((items: IngresoEgresoModel[]) => {
        try {
          return items.filter((item: IngresoEgresoModel) => item.state);
        } catch (error) {
          return items;
        }
      }),
      takeUntil(this.finisher$)
    );

    const categories$ = this._categoryFacadeService.getAll$().pipe(
      filter((items: CategoryModel[]) => !isNullOrUndefinedEmpty(items)),
      map((items: CategoryModel[]) => {
        try {
          return items.filter((item: CategoryModel) => item.state);
        } catch (error) {
          return items;
        }
      }),
      takeUntil(this.finisher$)
    );

    const results$ = combineLatest([ingresos_egresos$, categories$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([ingresos_egresos, categories]) => {
          return {
            ingresos_egresos,
            categories,
          };
        }),
        takeUntil(this.finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        this.calculate(data.ingresos_egresos);
        this.ingresos_egresos = data.ingresos_egresos;
        this.categories = data.categories;
        this.items = groupByMult(this.ingresos_egresos, [
          "typeActive",
          "category",
        ]);
      });

    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy(): void {
    this.finisher$.next();
    this._sharedFacadeService.reset();
    this._ingresoEgresoFacadeService.reset();
    this._categoryFacadeService.reset();
  }

  calculate(items: IngresoEgresoModel[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.cantIngresos = 0;
    this.cantEgresos = 0;
    items.forEach((item) => {
      if (item.typeActive === "Ingreso") {
        this.totalIngresos += item.amount;
        this.cantIngresos++;
      }

      if (item.typeActive === "Egreso") {
        this.totalEgresos += item.amount;
        this.cantEgresos++;
      }
    });
    this.earnings = this.totalIngresos - this.totalEgresos;
  }

  private chargeIndicatorManager(): void {
    const isLoadingIngresoEgreso$ =
      this._ingresoEgresoFacadeService.getLoading$();
    const isLoadingCategory$ = this._categoryFacadeService.getLoading$();

    const result$ = combineLatest([
      isLoadingIngresoEgreso$,
      isLoadingCategory$,
    ]).pipe(
      map(
        ([isLoadingIngresoEgreso, isLoadingCategory]) =>
          isLoadingIngresoEgreso || isLoadingCategory
      ),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
