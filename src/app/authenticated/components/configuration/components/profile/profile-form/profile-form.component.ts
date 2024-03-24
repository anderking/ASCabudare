import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { combineLatest, of, Subject } from "rxjs";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { filter, map, takeUntil } from "rxjs/operators";
import { Location } from "@angular/common";
import {
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";
import { TranslateService } from "@ngx-translate/core";
import {
  numberOfDecimal,
  phoneNumberArea,
  startDaySelect,
  systemDecimal,
} from "@root/core/constants/mocks/mocks-const";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { ComboModel } from "@models/masters/combo.model";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  private _attachmentFacadeService = inject(AttachmentFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _combosFacadeService = inject(CombosFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _translateService = inject(TranslateService);
  private _fb = inject(UntypedFormBuilder);
  private _location = inject(Location);
  private finisher$ = new Subject<void>();

  public mainForm: UntypedFormGroup;
  public dataForm: CurrentUserModel;
  public currentItem: CurrentUserModel;
  public isLoading: boolean;
  public isLoadingAttachment: boolean;

  public startDayCombo$: ComboModel[] = startDaySelect;
  public numberOfDecimalCombo$: ComboModel[] = numberOfDecimal;
  public systemDecimalCombo$: ComboModel[] = systemDecimal;
  public phoneNumberAreaCombo$: ComboModel[] = phoneNumberArea;

  ngOnInit() {
    this.mainForm = this.initForm();
    this.dataForm = { ...this.mainForm.getRawValue() };
    this.chargeIndicatorManager();

    const item$ = this._authFacadeService.getCurrentUser$().pipe(
      filter((item: CurrentUserModel) => !isNullOrUndefinedEmpty(item)),
      takeUntil(this.finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([item$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([item, mainForm]) => {
          return {
            item,
            mainForm,
          };
        }),
        takeUntil(this.finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        if (data.item) {
          this.selectCurrentItem(data.item);
        }
      });

    this._attachmentFacadeService
      .getUrlAttachment$()
      .pipe(filter((x) => !isNullOrUndefinedEmpty(x)))
      .subscribe((url) => {
        this.mainForm.get("photoURL").setValue(url);
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._attachmentFacadeService.reset();
    this.finisher$.next();
  }

  selectCurrentItem(item: CurrentUserModel): void {
    this.currentItem = item;
    this.mainForm.reset(item, { emitEvent: false });
  }

  initForm(): UntypedFormGroup {
    return this._fb.group({
      displayName: [""],
      phoneNumberArea: [""],
      phoneNumber: [""],
      officialRate: [
        "",
        [Validators.required, Validators.pattern(`^[0-9]+(.[0-9]+)?$`)],
      ],
      dayStartDashboard: ["", [Validators.required]],
      numberOfDecimal: [""],
      systemDecimal: [""],
      photoURL: [""],
    });
  }

  onSubmit() {
    this.dataForm = {
      ...this.currentItem,
      ...this.mainForm.getRawValue(),
    };
    if (this.mainForm.valid) {
      this._authFacadeService.updateProfile(this.dataForm);
      this._authFacadeService.updateProfileFB(this.dataForm);
      if (
        this.currentItem.dayStartDashboard != this.dataForm.dayStartDashboard
      ) {
      }
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm, this._translateService);
  }

  clean() {
    this.mainForm.reset();
  }

  goBack() {
    this._location.back();
  }

  private chargeIndicatorManager(): void {
    const isLoading$ = this._authFacadeService.getLoading$();
    const isLoadingCombos$ = this._combosFacadeService.getLoading$();
    const isLoadingUpdateProfile$ =
      this._authFacadeService.getUpdateProfileLoading$();

    const result$ = combineLatest([
      isLoading$,
      isLoadingCombos$,
      isLoadingUpdateProfile$,
    ]).pipe(
      map(
        ([isLoading, isLoadingCombos, isLoadingUpdateProfile]) =>
          isLoading || isLoadingCombos || isLoadingUpdateProfile
      ),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
