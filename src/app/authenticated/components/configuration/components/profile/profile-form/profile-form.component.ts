import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { ToastService } from "@services/ui/toast.service";
import { TranslateService } from "@ngx-translate/core";
import {
  numberOfDecimal,
  startDaySelect,
  systemDecimal,
} from "@root/core/constants/mocks/mocks-const";
import { AttachmentModel } from "@models/shared/attachment.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public mainForm: UntypedFormGroup;
  public dataForm: CurrentUserModel;
  public currentItem: CurrentUserModel;
  public isLoading: boolean;
  public isLoadingAttachment: boolean;

  public fileName = "";
  public errorFiles = "";
  public currentFile: AttachmentModel = null;

  public startDay$: any = of(startDaySelect);
  public numberOfDecimal$: any = of(numberOfDecimal);
  public systemDecimal$: any = of(systemDecimal);

  constructor(
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _fb: UntypedFormBuilder,
    private _authFacadeService: AuthFacadeService,
    private _attachmentFacadeService: AttachmentFacadeService,
    private _toastService: ToastService,
    private translateService: TranslateService,
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService
  ) {
    this.mainForm = this.initForm();
  }

  ngOnInit() {
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
        this.currentFile = null;
        this.fileName = "";
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
      phoneNumber: [""],
      currency: [""],
      photoURL: [""],
      dayStartDashboard: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      numberOfDecimal: [null, [Validators.pattern(/^[0-9]\d*$/)]],
      systemDecimal: [null],
    });
  }

  onSubmit() {
    this.dataForm = {
      ...this.currentItem,
      ...this.mainForm.getRawValue(),
    };
    if (this.mainForm.valid) {
      this._authFacadeService.updateProfile(this.dataForm);
      if (
        this.currentItem.dayStartDashboard != this.dataForm.dayStartDashboard
      ) {
        this._ingresoEgresoFacadeService.setCurrentFilter(null);
      }
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm, this.translateService);
  }

  clean() {
    this.mainForm.reset();
    this.errorFiles = "";
    this.fileName = "";
  }

  goBack() {
    this._location.back();
  }

  changeFile(event: any): void {
    const jpg = "image/jpg";
    const jpeg = "image/jpeg";
    const png = "image/png";
    const max_size = 1000000;
    const allowed_types = [jpg, jpeg, png];

    const filesInput = event.target.files;

    if (filesInput.length > 0) {
      for (let value of filesInput) {
        const currentFile: any = value;
        const extension = allowed_types.includes(currentFile.type);
        let isValid = true;

        if (!extension) {
          this.errorFiles = this.translateService.instant(
            "VALIDATIONS.VALID_FILE_EXTENSION"
          );
          isValid = false;
        }

        if (currentFile.size > max_size) {
          this.errorFiles =
            this.translateService.instant("VALIDATIONS.VALID_FILE_SIZE") +
            " " +
            max_size / 1000000 +
            "Mb";
          isValid = false;
        }
        if (isValid) {
          this.errorFiles = "";
          this.fileName = currentFile.name;
          this.currentFile = currentFile;
        } else {
          this.currentFile = null;
        }
      }
    }
  }

  public uploadFile() {
    if (this.currentFile) {
      this._attachmentFacadeService.create(this.currentFile);
    } else {
      this._toastService.show(
        this.translateService.instant("VALIDATIONS.UPLOAD_FILE_REQUERID"),
        {
          classname: "bg-danger text-light",
          delay: 5000,
        }
      );
    }
  }

  private chargeIndicatorManager(): void {
    this._attachmentFacadeService
      .getLoading$()
      .subscribe((loading) => (this.isLoadingAttachment = loading));
    const isLoading$ = this._authFacadeService.getLoading$();
    const isLoadingUpdateProfile$ =
      this._authFacadeService.getUpdateProfileLoading$();

    const result$ = combineLatest([isLoading$, isLoadingUpdateProfile$]).pipe(
      map(
        ([isLoading, isLoadingUpdateProfile]) =>
          isLoading || isLoadingUpdateProfile
      ),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
