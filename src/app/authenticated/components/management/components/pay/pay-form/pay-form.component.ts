import { Component, OnInit, OnDestroy, inject, Input } from "@angular/core";
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
import { combineLatest, of, Subject } from "rxjs";
import { PayFacadeService } from "@facades/pay-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { PayModel } from "@models/management/pay.model";
import { filter, map, takeUntil } from "rxjs/operators";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { Location } from "@angular/common";
import {
  getErrorMessageField,
  isValidField,
  setValidatorEqualLength,
  setValidatorOnlyCharacteres,
  setValidatorOnlyCharacteresAndNumbers,
  setValidatorOnlyNumbers,
} from "@root/core/utilities/form-validations";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { buildCreateDate } from "@root/core/utilities/core.utilities";
import { TranslateService } from "@ngx-translate/core";
import {
  documentType,
  phoneNumberArea,
} from "@root/core/constants/mocks/mocks-const";
import { AttachmentModel } from "@models/shared/attachment.model";

@Component({
  selector: "app-pay-form",
  templateUrl: "./pay-form.component.html",
})
export class PayFormComponent implements OnInit, OnDestroy {
  @Input() id?: string;

  private _payFacadeService = inject(PayFacadeService);
  private _combosFacadeService = inject(CombosFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _location = inject(Location);
  private _fb = inject(UntypedFormBuilder);
  private _translateService = inject(TranslateService);
  private _finisher$ = new Subject<void>();

  public mainForm: UntypedFormGroup;
  public dataForm: PayModel;
  public currentItem: PayModel;
  public currentUser: CurrentUserModel;
  public currentFile: AttachmentModel = null;
  public validFile: boolean = true;
  public isLoading: boolean;
  public isLoadingAttachment: boolean;
  public createDate: string = null;
  public createDateFB: object = null;

  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  public phoneNumberArea$: any = phoneNumberArea;
  public documentType$: any = documentType;

  ngOnInit() {
    this.mainForm = this.initForm();
    this.chargeIndicatorManager();

    this._authFacadeService
      .getCurrentUser$()
      .pipe(takeUntil(this._finisher$))
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
        this.numberOfDecimal = user?.numberOfDecimal
          ? user.numberOfDecimal
          : this.numberOfDecimal;
        this.systemDecimal = user?.systemDecimal
          ? user.systemDecimal
          : this.systemDecimal;
      });

    const items$ = this._payFacadeService.getAll$().pipe(
      filter((items: PayModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this._finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([items$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([items, mainForm]) => {
          try {
            return {
              item: items.find((item: PayModel) => item.id === this.id),
              mainForm,
            };
          } catch (error) {
            return {
              item: null,
              mainForm,
            };
          }
        }),
        takeUntil(this._finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        if (data.item) {
          this.selectCurrentItem(data.item);
        }
      });

    this._payFacadeService
      .getCurrentItem$()
      .pipe(
        filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)),
        takeUntil(this._finisher$)
      )
      .subscribe((currentItem) => {
        console.log("currentItem", currentItem);
        this.currentItem = currentItem;
      });

    this._sharedFacadeService
      .getMessage$()
      .pipe(
        filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)),
        takeUntil(this._finisher$)
      )
      .subscribe(() => {
        if (!this.currentItem) {
          this.clean();
        }
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._payFacadeService.resetSelected();
    this._finisher$.next();
  }

  selectCurrentItem(item: PayModel): void {
    this.mainForm.reset(item, { emitEvent: false });
    this._payFacadeService.select(item);
  }

  initForm(): UntypedFormGroup {
    this.createDate = buildCreateDate().createDate;
    this.createDateFB = buildCreateDate().createDateFB;

    return this._fb.group({
      displayName: [
        "",
        [
          Validators.required,
          setValidatorOnlyCharacteres(this._translateService),
          Validators.maxLength(700),
        ],
      ],
      documentType: ["", [Validators.required]],
      documentNumber: [
        "",
        [
          Validators.required,
          setValidatorOnlyCharacteresAndNumbers(this._translateService),
        ],
      ],
      phoneNumberArea: ["", [Validators.required]],
      phoneNumber: [
        "",
        [
          Validators.required,
          setValidatorOnlyNumbers(this._translateService),
          setValidatorEqualLength(7),
        ],
      ],
      reference: [
        "",
        [
          Validators.required,
          setValidatorOnlyCharacteresAndNumbers(this._translateService),
          Validators.maxLength(50),
        ],
      ],
      amount: [
        "",
        [Validators.required, Validators.pattern(`^[0-9]+(.[0-9]+)?$`)],
      ],
      photoURL: [""],
      currency: ["VES"],
      state: [false],
    });
  }

  onSubmit(createDate: string, createDateFB: object) {
    if (!this.currentItem) {
      this.dataForm = {
        ...this.mainForm.getRawValue(),
        createDate,
        createDateFB,
        stateText: this.mainForm.getRawValue().state ? "Confirmado" : "Pagado",
      };
    } else {
      this.dataForm = {
        ...this.currentItem,
        ...this.mainForm.getRawValue(),
        createDate: this.currentItem.createDate,
        createDateFB: this.currentItem.createDateFB,
        stateText: this.mainForm.getRawValue().state ? "Confirmado" : "Pagado",
      };
    }
    console.log(this.dataForm);
    if (this.mainForm.valid) {
      this._payFacadeService.create(this.dataForm);
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm, this._translateService);
  }

  clean() {
    this.mainForm.reset({ state: true });
  }

  goBack() {
    this._location.back();
  }

  chargeIndicatorManager(): void {
    const isLoadingPay$ = this._payFacadeService.getLoading$();
    const isLoadingCombos$ = this._combosFacadeService.getLoading$();

    const result$ = combineLatest([isLoadingPay$, isLoadingCombos$]).pipe(
      map(([isLoadingPay, isLoadingCombos]) => isLoadingPay || isLoadingCombos),
      takeUntil(this._finisher$)
    );

    result$.pipe(takeUntil(this._finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
