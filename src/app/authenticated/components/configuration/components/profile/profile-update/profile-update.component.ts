import { Component, OnInit, OnDestroy } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { combineLatest, of, Subject } from "rxjs";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  filter,
  map,
  takeUntil,
} from "rxjs/operators";
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
import { startDaySelect } from "@root/core/constants/mocks/mocks-const";
import { AttachmentModel } from "@models/shared/attachment.model";


@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.scss"],
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

  constructor(
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _fb: UntypedFormBuilder,
    private _authFacadeService: AuthFacadeService,
    private _attachmentFacadeService: AttachmentFacadeService,
    private _toastService: ToastService,
    private translateService: TranslateService
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
        this._toastService.show(
          this.translateService.instant("MESSAGES.UPLOAD_FILE_SUCCESS"),
          {
            classname: "bg-success text-light",
            delay: 5000,
          }
        );
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
      dayStartDashboard: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.dataForm = {
      ...this.currentItem,
      ...this.mainForm.getRawValue(),
    };
    console.log(this.mainForm.controls);
    if (this.mainForm.valid) {
      console.log(this.dataForm);
      this._authFacadeService.updateProfile(this.dataForm);
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
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
      for (let i = 0; i < filesInput.length; i++) {
        const currentFile: any = filesInput[i];
        const extension = allowed_types.includes(currentFile.type);
        let isValid = true;

        if (!extension) {
          this.errorFiles = this.translateService.instant(
            "MESSAGES.VALID_FILE_EXTENSION"
          );
          isValid = false;
        }

        if (currentFile.size > max_size) {
          this.errorFiles =
            this.translateService.instant("MESSAGES.VALID_FILE_SIZE") +
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
        this.translateService.instant("MESSAGES.UPLOAD_FILE_REQUERID"),
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
    const isLoadingUpdateProfileFB$ =
      this._authFacadeService.getUpdateProfileFBLoading$();

    const result$ = combineLatest([
      isLoading$,
      isLoadingUpdateProfile$,
      isLoadingUpdateProfileFB$,
    ]).pipe(
      map(
        ([isLoading, isLoadingUpdateProfile, isLoadingUpdateProfileFB]) =>
          isLoading || isLoadingUpdateProfile
      ),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
