import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { combineLatest, Subject } from "rxjs";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { filter, map, takeUntil } from "rxjs/operators";
import {
  getErrorMessageField,
  isValidField,
  setValidatorEqualLength,
  setValidatorOnlyCharacteres,
  setValidatorOnlyCharacteresAndNumbers,
} from "@root/core/utilities/form-validations";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";
import { TranslateService } from "@ngx-translate/core";
import {
  documentType,
  payType,
  phoneNumberArea,
} from "@root/core/constants/mocks/mocks-const";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { PayFacadeService } from "@facades/pay-facade.service";
import { PayModel } from "@models/management/pay.model";
import { AttachmentModel } from "@models/shared/attachment.model";
import { buildCreateDate } from "@root/core/utilities/core.utilities";
import { ComboModel } from "@models/masters/combo.model";

@Component({
  selector: "app-pay",
  templateUrl: "./pay.component.html",
})
export class PayComponent implements OnInit, OnDestroy {
  private _attachmentFacadeService = inject(AttachmentFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _combosFacadeService = inject(CombosFacadeService);
  private _payFacadeService = inject(PayFacadeService);
  private _translateService = inject(TranslateService);
  private _fb = inject(UntypedFormBuilder);
  private _finisher$ = new Subject<void>();

  public mainForm: UntypedFormGroup;
  public dataForm: PayModel;
  public currentItem: PayModel;
  public currentFile: AttachmentModel = null;
  public validFile: boolean = true;
  public createDateFB: object = null;
  public createDate: string = null;
  public isLoading: boolean;
  public isLoadingAttachment: boolean;

  public phoneNumberArea$: ComboModel[] = phoneNumberArea;
  public documentType$: ComboModel[] = documentType;

  public payTypeCombo$: ComboModel[] = payType;
  public payTypesArray: ComboModel[] = payType;
  public payTypeCurrent: ComboModel = null;

  ngOnInit() {
    this.mainForm = this.initForm();
    this.dataForm = { ...this.mainForm.getRawValue() };

    this.chargeIndicatorManager();
    this.controlSubscriptions();

    this._sharedFacadeService
      .getMessage$()
      .pipe(filter((message) => !isNullOrUndefinedEmpty(message)))
      .subscribe(() => {
        this.clean();
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._attachmentFacadeService.reset();
    this._finisher$.next();
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
      phoneNumber: ["", [Validators.required, setValidatorEqualLength(7)]],
      reference: ["", [Validators.maxLength(50)]],
      idPayType: ["MOV", [Validators.required]],
      payType: ["Pago Móvil", [Validators.required]],
      amount: [
        "",
        [Validators.required, Validators.pattern(`^[0-9]+(.[0-9]+)?$`)],
      ],
      photoURL: [""],
      currency: ["VES"],
      idStateSolvency: ["PAY", [Validators.required]],
      stateSolvency: ["Pagado", [Validators.required]],
      state: [true],
    });
  }

  onSubmit(createDate: string, createDateFB: object) {
    this.dataForm = {
      ...this.mainForm.getRawValue(),
      createDate,
      createDateFB,
      stateText: "Activo",
    };
    if (this.mainForm.valid) {
      console.log(this.dataForm);
      this._payFacadeService.create(this.dataForm, this.currentFile);
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
    this.currentFile = null;
  }

  currentFileEmit(event: AttachmentModel) {
    this.currentFile = event;
  }

  validFileEmit(event: boolean) {
    console.log(event);
    this.validFile = event;
  }

  controlSubscriptions(): void {
    this.mainForm
      .get("idPayType")
      .valueChanges.pipe(
        filter((value) => !isNullOrUndefined(value)),
        takeUntil(this._finisher$)
      )
      .subscribe((value: string) => {
        console.log(value);
        if (this.payTypesArray && this.payTypesArray.length > 0) {
          try {
            this.payTypeCurrent = this.payTypesArray.find(
              (i: ComboModel) => i.id === value
            );
            this.mainForm.patchValue({
              payType: this.payTypeCurrent ? this.payTypeCurrent.name : null,
            });
          } catch (error) {
            return;
          }
        }
      });
  }

  private chargeIndicatorManager(): void {
    const isLoading$ = this._payFacadeService.getLoading$();
    const isLoadingCombos$ = this._combosFacadeService.getLoading$();
    const isLoadingPay$ = this._payFacadeService.getLoading$();

    const result$ = combineLatest([
      isLoading$,
      isLoadingCombos$,
      isLoadingPay$,
    ]).pipe(
      map(
        ([isLoading, isLoadingCombos, isLoadingPay]) =>
          isLoading || isLoadingCombos || isLoadingPay
      ),
      takeUntil(this._finisher$)
    );

    result$.pipe(takeUntil(this._finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
