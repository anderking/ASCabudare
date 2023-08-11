import { Component, OnInit, OnDestroy } from "@angular/core";
import { combineLatest, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { CategoryModel } from "@models/configurations/category.model";
import { groupByMult } from "@root/core/utilities/core.utilities";
import { GroupModel } from "@models/shared/group.model";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { RangeDate } from "@models/shared/filter.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "@services/ui/modal.service";
import { ModalModel } from "@models/shared/modal.model";
import { AmountPipe } from "@root/core/pipes/amount.pipe";
import { MillionPipe } from "@root/core/pipes/million.pipe";
import { FilterTableSearchPipe } from "@root/core/pipes/filter-table-search.pipe";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public wordFilter = "";
  public ingresos_egresos: IngresoEgresoModel[] = [];
  public categories: CategoryModel[] = [];
  public items: GroupModel<GroupModel<IngresoEgresoModel>>[] = [];
  public isLoading: boolean;
  public totalIngresos: number;
  public totalEgresos: number;
  public totalEarnings: number;
  public cantIngresos: any;
  public cantEgresos: any;
  public currentUser: CurrentUserModel;
  private rangeDate: RangeDate;

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _categoryFacadeService: CategoryFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private translateService: TranslateService,
    private modalService: ModalService,
    private _amountPipe: AmountPipe,
    private _millionPipe: MillionPipe,
    private _filterTableSearchPipe: FilterTableSearchPipe
  ) {}

  ngOnInit() {
    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
      });
    this.chargeIndicatorManager();
  }

  ngOnDestroy(): void {
    this.finisher$.next();
    this._sharedFacadeService.reset();
  }

  rangeDateReceived(rangeDate: RangeDate): void {
    this.rangeDate = rangeDate;
    setTimeout(() => {
      this.loadItems();
    }, 10);
  }

  loadItems(): void {
    const ingresos_egresos$ = this._ingresoEgresoFacadeService.getAll$().pipe(
      filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
      map((items: IngresoEgresoModel[]) => {
        try {
          return items.filter((item: IngresoEgresoModel) => item.state);
        } catch (error) {
          return items;
        }
      }),
      map((items: IngresoEgresoModel[]) => {
        try {
          return items.filter((item: IngresoEgresoModel) => {
            if (this.rangeDate) {
              const createDate = new Date(item.createDate).getTime();
              const startDate = new Date(this.rangeDate?.startDate).getTime();
              const endDate = new Date(this.rangeDate?.endDate).getTime();
              if (createDate >= startDate && createDate <= endDate) {
                return true;
              } else {
                return false;
              }
            }
          });
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
          try {
            return {
              ingresos_egresos,
              categories,
            };
          } catch (error) {
            return {
              ingresos_egresos: [],
              categories: [],
            };
          }
        }),
        takeUntil(this.finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        const ingresos_egresos = this._filterTableSearchPipe.transform(
          data.ingresos_egresos,
          { category: this.wordFilter },
          false
        );
        this.ingresos_egresos = data.ingresos_egresos;
        this.categories = data.categories;
        this.calculateRender(ingresos_egresos);
      });
  }

  wordFilterReceived(wordFilter: string): void {
    this.wordFilter = wordFilter;
    const ingresos_egresos = this._filterTableSearchPipe.transform(
      this.ingresos_egresos,
      { category: this.wordFilter },
      false
    );
    this.calculateRender(ingresos_egresos);
  }

  calculateRender(ingresos_egresos: IngresoEgresoModel[]): void {
    this.calculate(ingresos_egresos);
    this.items = groupByMult(ingresos_egresos, ["typeActive", "category"]);
  }

  private calculate(items: IngresoEgresoModel[]): void {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.cantIngresos = 0;
    this.cantEgresos = 0;
    try {
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
    } catch (error) {
      console.error(error);
    }
    this.totalEarnings = this.totalIngresos - this.totalEgresos;
  }

  openModal(item: GroupModel<IngresoEgresoModel>): void {
    const amountAcum = this._amountPipe.transform(item.values, "amount");
    const amountAcumFormat = this._millionPipe.transform(amountAcum, "1.2-2");
    const title =
      this.translateService.instant("TITLES.TOTAL") + " " + amountAcumFormat;
    const data: ModalModel<GroupModel<IngresoEgresoModel>> = {
      type: "custom",
      item,
      title,
      currentUser: this.currentUser,
    };
    this.modalService
      .openModal(data)
      .then(() => {})
      .catch(() => {});
  }

  public chargeIndicatorManager(): void {
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
