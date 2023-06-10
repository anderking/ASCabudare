import { Component, OnInit, OnDestroy } from "@angular/core";
import { combineLatest, Subject } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { CategoryModel } from "@models/configurations/category.model";
import { groupByMult } from "@root/core/utilities/core.utilities";
import { GroupModel } from "@models/shared/group.model";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  ValidationsCustom,
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { RangeDate } from "@models/shared/filter.model";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public mainForm: UntypedFormGroup;
  public finisher$ = new Subject<void>();
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

  private _initDay: string = null;
  private _rangeDate: RangeDate;

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _categoryFacadeService: CategoryFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _fb: UntypedFormBuilder
  ) {
    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
        if (user) {
          this._initDay = user.dayStartDashboard;
          this.mainForm = this.initForm();
        }
      });
  }

  ngOnInit() {
    this.chargeIndicatorManager();
    this._ingresoEgresoFacadeService.search();
    this._categoryFacadeService.search();
    this.loadItems();
  }

  ngOnDestroy(): void {
    this.finisher$.next();
    this._sharedFacadeService.reset();
    this._ingresoEgresoFacadeService.reset();
    this._categoryFacadeService.reset();
  }

  private initForm(): UntypedFormGroup {
    const day = this._initDay ? this._initDay : "01";
    const today = new Date().toLocaleDateString("en-CA");
    const todaySplit = today.split("-");
    const initStartDate =
      todaySplit[0] + "-" + todaySplit[1] + "-" + day + "T04:00:00.000Z";

    const initEndDate = new Date(initStartDate).setMonth(
      new Date(initStartDate).getMonth() + 1
    );

    this._rangeDate = {
      startDate: new Date(initStartDate).toLocaleDateString("en-CA"),
      endDate: new Date(initEndDate).toLocaleDateString("en-CA"),
    };

    return this._fb.group({
      startDate: [
        new Date(initStartDate).toLocaleDateString("en-CA"),
        [Validators.required],
      ],
      endDate: [
        new Date(initEndDate).toLocaleDateString("en-CA"),
        [Validators.required],
      ],
    });
  }

  private loadItems(): void {
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
            if (this._rangeDate) {
              const createDate = new Date(item.createDate).getTime();
              const startDate = new Date(this._rangeDate?.startDate).getTime();
              const endDate = new Date(this._rangeDate?.endDate).getTime();
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
          return {
            ingresos_egresos,
            categories,
          };
        }),
        takeUntil(this.finisher$)
      )
      .subscribe((data) => {
        //console.log("DATA", data);
        this.calculate(data.ingresos_egresos);
        this.ingresos_egresos = data.ingresos_egresos;
        this.categories = data.categories;
        this.items = groupByMult(this.ingresos_egresos, [
          "typeActive",
          "category",
        ]);
      });
  }

  private calculate(items: IngresoEgresoModel[]): void {
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
    this.totalEarnings = this.totalIngresos - this.totalEgresos;
  }

  public changeFilter(value: string, field: string): void {
    this._rangeDate = {
      ...this._rangeDate,
      [field]: value,
    };
    console.log(this._rangeDate);

    const startDateControl = this.mainForm.controls["startDate"];
    const endDateControl = this.mainForm.controls["endDate"];

    if (field === "startDate") {
      startDateControl.setValidators([
        ValidationsCustom.setValidatorDateDashboard(this.mainForm, field),
      ]);
    }

    if (field === "endDate") {
      endDateControl.setValidators([
        ValidationsCustom.setValidatorDateDashboard(this.mainForm, field),
      ]);
    }

    startDateControl.markAsTouched();
    startDateControl.updateValueAndValidity();
    endDateControl.markAsTouched();
    endDateControl.updateValueAndValidity();

    if (this.mainForm.valid) {
      this.loadItems();
    }
  }

  public isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  public getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
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
