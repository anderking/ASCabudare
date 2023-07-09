import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { CurrentFilterModel, RangeDate } from "@models/shared/filter.model";
import {
  ValidationsCustom,
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject, filter, takeUntil } from "rxjs";
import { faArrowLeft, faArrowRight, faCalendarCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-current-filter",
  templateUrl: "./current-filter.component.html",
})
export class CurrentFilterComponent implements OnInit, OnDestroy {
  @Output() rangeDateEmit: EventEmitter<RangeDate> = new EventEmitter();
  public mainForm: UntypedFormGroup;
  public rangeDate: RangeDate;
  public initDay: string = null;
  public wordFilter = "";
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;
  public faTrash = faTrash;
  public faCalendarCheck = faCalendarCheck
  public beforeCounter = 1;
  public nextCounter = 1;
  public finisher$ = new Subject<void>();

  constructor(
    private _fb: UntypedFormBuilder,
    private _authFacadeService: AuthFacadeService,
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService
  ) {}

  ngOnInit(): void {
    this._authFacadeService
      .getCurrentUser$()
      .pipe(takeUntil(this.finisher$))
      .subscribe((user: CurrentUserModel) => {
        if (user) {
          this.initDay = user.dayStartDashboard;
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
        takeUntil(this.finisher$)
      )
      .subscribe((currentFilter: CurrentFilterModel) => {
        this.rangeDate = currentFilter.rangeDate;
        const startDateControl = this.mainForm.controls["startDate"];
        const endDateControl = this.mainForm.controls["endDate"];
        startDateControl.setValue(currentFilter?.rangeDate?.startDate);
        endDateControl.setValue(currentFilter?.rangeDate?.endDate);
        this.wordFilter = currentFilter.wordFilter;
        this.rangeDateEmit.emit(this.rangeDate);
      });
  }

  ngOnDestroy(): void {
    this.finisher$.next();
    if (this.rangeDate) {
      const payload: CurrentFilterModel = {
        rangeDate: this.rangeDate,
        wordFilter: this.wordFilter,
      };
      this._ingresoEgresoFacadeService.setCurrentFilter(payload);
    }
  }

  public initForm(): UntypedFormGroup {
    this.initDates();
    return this._fb.group({
      startDate: [this.rangeDate.startDate, [Validators.required]],
      endDate: [this.rangeDate.endDate, [Validators.required]],
    });
  }

  public initDates(): void {
    const day = this.initDay ? this.initDay : "01";
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
    this.rangeDateEmit.emit(this.rangeDate);
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
      this.rangeDateEmit.emit(this.rangeDate);
    }
  }

  public resetDates(): void {
    this.initDates();
    this.mainForm.reset({
      startDate: this.rangeDate.startDate,
      endDate: this.rangeDate.endDate,
    });
  }

  public changeToday(): void {
    const today = new Date().toLocaleDateString("en-CA");
    this.rangeDate = {
      startDate: today,
      endDate: today,
    };
    this.mainForm.reset({
      startDate: today,
      endDate: today,
    });
    this.rangeDateEmit.emit(this.rangeDate);
  }

  public changeMonth(type: "before" | "next"): void {
    let startDateNew = "";
    let endDateNew = "";
    const startDateString = this.rangeDate.startDate;
    const startDateISO = startDateString + "T04:00:00.000Z";
    const startDate = new Date(startDateISO);
    const startDateMonth = startDate.getMonth();

    const endDateString = this.rangeDate.endDate;
    const endDateISO = endDateString + "T04:00:00.000Z";
    const endDate = new Date(endDateISO);
    const endDateMonth = endDate.getMonth();

    if (type == "before") {
      startDate.setMonth(startDateMonth - 1);
      endDate.setMonth(endDateMonth - 1);
    } else {
      startDate.setMonth(startDateMonth + 1);
      endDate.setMonth(endDateMonth + 1);
    }

    const startDateNext = startDate.toLocaleDateString("en-CA");
    const startDateNextISO = startDateNext + "T04:00:00.000Z";
    startDateNew = startDateNextISO ? startDateNextISO.split("T")[0] : "";

    const endDateNext = endDate.toLocaleDateString("en-CA");
    const endDateNextISO = endDateNext + "T04:00:00.000Z";
    endDateNew = endDateNextISO ? endDateNextISO.split("T")[0] : "";

    console.log("startDateNew", startDateNew);
    console.log("endDateNew", endDateNew);
    if (startDateNew && endDateNew) {
      this.rangeDate = {
        startDate: startDateNew,
        endDate: endDateNew,
      };
      this.mainForm.reset({
        startDate: startDateNew,
        endDate: endDateNew,
      });
      this.rangeDateEmit.emit(this.rangeDate);
    }
  }

  public isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  public getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
  }
}
