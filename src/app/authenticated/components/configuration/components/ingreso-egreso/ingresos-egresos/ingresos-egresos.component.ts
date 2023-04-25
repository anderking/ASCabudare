import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { RangeDate } from "@models/shared/dashboard.model";
import {
  ValidationsCustom,
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";

@Component({
  selector: "app-ingresos-egresos",
  templateUrl: "./ingresos-egresos.component.html",
  styleUrls: ["./ingresos-egresos.component.scss"],
})
export class IngresosEgresosComponent implements OnInit, OnDestroy {
  public mainForm: UntypedFormGroup;
  public isLoading: boolean;
  public items: IngresoEgresoModel[] = [];
  public wordFilter = "";
  public currentUser: CurrentUserModel;
  private _finisher = new Subject<void>();
  private _initDay: string = null;
  private _rangeDate: RangeDate;

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _location: Location,
    private _router: Router,
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
    this._ingresoEgresoFacadeService.search();
    this._ingresoEgresoFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
    this.loadItems();
  }

  ngOnDestroy(): void {
    this._finisher.next();
    this._ingresoEgresoFacadeService.reset();
    this._sharedFacadeService.reset();
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
    this._ingresoEgresoFacadeService
      .getAll$()
      .pipe(
        filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
        map((items: IngresoEgresoModel[]) => {
          try {
            return items.filter((item: IngresoEgresoModel) => {
              if (this._rangeDate) {
                const createDate = new Date(item.createDate).getTime();
                const startDate = new Date(
                  this._rangeDate?.startDate
                ).getTime();
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
        takeUntil(this._finisher)
      )
      .subscribe((items: IngresoEgresoModel[]) => {
        this.items = items;
      });
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
      //this._ingresoEgresoFacadeService.search();
    }
  }

  public isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  public getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
  }

  public goDelete(item: IngresoEgresoModel): void {
    this._ingresoEgresoFacadeService.delete(item);
  }

  public goNew(): void {
    this._router.navigate(["/authenticated/configuration/ingreso-egreso/form"]);
  }
  public goEdit(item: IngresoEgresoModel): void {
    this._router.navigate([
      "/authenticated/configuration/ingreso-egreso/form",
      { id: item?.id },
    ]);
  }
  public goBack(): void {
    this._location.back();
  }
}
