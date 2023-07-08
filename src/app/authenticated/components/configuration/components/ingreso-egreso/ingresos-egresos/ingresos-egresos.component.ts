import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, map, takeUntil } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
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
import {
  ValidationsCustom,
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { CurrentFilterModel, RangeDate } from "@models/shared/filter.model";
import { ModalModel } from "@models/shared/modal.model";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "@services/ui/modal.service";

@Component({
  selector: "app-ingresos-egresos",
  templateUrl: "./ingresos-egresos.component.html",
})
export class IngresosEgresosComponent implements OnInit, OnDestroy {
  public mainForm: UntypedFormGroup;
  public isLoading: boolean;
  public items: IngresoEgresoModel[] = [];
  public wordFilter = "";
  public currentUser: CurrentUserModel;
  public rangeDate: RangeDate;
  private _finisher = new Subject<void>();
  private _initDay: string = null;

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _location: Location,
    private _router: Router,
    private translateService: TranslateService,
    private modalService: ModalService,
    private _fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
        if (user) {
          this._initDay = user.dayStartDashboard;
          this.mainForm = this.initForm();
        }
      });

    this._ingresoEgresoFacadeService
      .getCurrentFilter$()
      .pipe(
        filter(
          (currentFilter: CurrentFilterModel) =>
            !isNullOrUndefinedEmpty(currentFilter)
        ),
        takeUntil(this._finisher)
      )
      .subscribe((currentFilter: CurrentFilterModel) => {
        this.rangeDate = currentFilter.rangeDate;
        const startDateControl = this.mainForm.controls["startDate"];
        const endDateControl = this.mainForm.controls["endDate"];
        startDateControl.setValue(currentFilter?.rangeDate?.startDate);
        endDateControl.setValue(currentFilter?.rangeDate?.endDate);
        this.wordFilter = currentFilter.wordFilter;
      });

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
    this._sharedFacadeService.reset();
    if (this.rangeDate) {
      const payload: CurrentFilterModel = {
        rangeDate: this.rangeDate,
        wordFilter: this.wordFilter,
      };
      this._ingresoEgresoFacadeService.setCurrentFilter(payload);
    }
  }

  initForm(): UntypedFormGroup {
    const day = this._initDay ? this._initDay : "01";
    const today = new Date().toLocaleDateString("en-CA");
    const todaySplit = today.split("-");
    const yearCurrent = todaySplit[0];
    let monthCurrent = todaySplit[1];
    const dayCurrent = todaySplit[2];

    if (parseInt(dayCurrent) < parseInt(day)) {
      monthCurrent = "0" + (parseInt(monthCurrent) - 1).toString();
    }

    const startDateString = yearCurrent + "-" + monthCurrent + "-" + day;
    const startDateISO = startDateString + "T04:00:00.000Z";
    const startDate = new Date(startDateISO);
    const startDateMonth = startDate.getMonth();
    startDate.setMonth(startDateMonth + 1);
    const startDateNext =
      startDate.toLocaleDateString("en-CA") + "T04:00:00.000Z";

    const endDate = new Date(startDateNext);
    const endDateDay = endDate.getDate();
    endDate.setDate(endDateDay - 1);
    const endDateISO = endDate.toISOString();
    const endDateSplit = endDateISO ? endDateISO.split("T")[0] : "";

    this.rangeDate = {
      startDate: startDateString,
      endDate: endDateSplit,
    };

    return this._fb.group({
      startDate: [startDateString, [Validators.required]],
      endDate: [endDateSplit, [Validators.required]],
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
        takeUntil(this._finisher)
      )
      .subscribe((items: IngresoEgresoModel[]) => {
        this.items = items;
      });
  }

  public changeFilter(value: string, field: string): void {
    this.rangeDate = {
      ...this.rangeDate,
      [field]: value,
    };

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

  openModalConfirmation(item: IngresoEgresoModel) {
    const data: ModalModel<IngresoEgresoModel> = {
      type: "confirmation",
      item,
      title: this.translateService.instant("TITLES.CONFIRMATION"),
      message: this.translateService.instant("TEXTS.CONFIRMATION"),
      buttonYes: this.translateService.instant("BUTTONS.YES"),
      buttonCancel: this.translateService.instant("BUTTONS.CANCEL"),
    };
    this.modalService
      .openModal(data)
      .then((data) => {
        this.goDelete(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
