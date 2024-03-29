import { Component, OnInit, OnDestroy, inject, Input } from "@angular/core";
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { BehaviorSubject, combineLatest, Observable, of, Subject } from "rxjs";
import { ClientFacadeService } from "@facades/client-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { ClientModel } from "@models/configurations/client.model";
import { filter, map, takeUntil } from "rxjs/operators";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { ComboModel } from "@models/masters/combo.model";
import { Location } from "@angular/common";
import {
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { buildCreateDate } from "@root/core/utilities/core.utilities";
import { TranslateService } from "@ngx-translate/core";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
})
export class ClientFormComponent implements OnInit, OnDestroy {
  @Input() id?: string;

  private _attachmentFacadeService = inject(AttachmentFacadeService);
  private _clientFacadeService = inject(ClientFacadeService);
  private _combosFacadeService = inject(CombosFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _translateService = inject(TranslateService);
  private _fb = inject(UntypedFormBuilder);
  private _location = inject(Location);
  private _finisher$ = new Subject<void>();

  public mainForm: UntypedFormGroup;
  public dataForm: ClientModel;
  public currentItem: ClientModel = null;
  public isLoading: boolean;
  public documentTypesArray: ComboModel[] = [];
  public documentTypeCurrent: ComboModel;
  public documentTypeCombo$ = new BehaviorSubject<ComboModel[]>([]);
  public currentUser: CurrentUserModel;
  public createDateFB: object = null;
  public createDate: string = null;

  ngOnInit() {
    this.mainForm = this.initForm();
    this.callsCombos();
    this.chargeIndicatorManager();
    this.controlSubscriptions();

    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
      });

    const items$ = this._clientFacadeService.getAll$().pipe(
      filter((items: ClientModel[]) => !isNullOrUndefinedEmpty(items)),
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
              item: items.find((item: ClientModel) => item.id === this.id),
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

    this._clientFacadeService
      .getCurrentItem$()
      .pipe(
        filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)),
        takeUntil(this._finisher$)
      )
      .subscribe((currentItem) => {
        console.log("currentItem", currentItem);
        this.currentItem = currentItem;
      });

    this._attachmentFacadeService
      .getUrlAttachment$()
      .pipe(filter((x) => !isNullOrUndefinedEmpty(x)))
      .subscribe((url) => {
        this.mainForm.get("image").setValue(url);
      });

    this.disabledInputs(mainForm$);
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._finisher$.next();
  }

  selectCurrentItem(item: ClientModel): void {
    this.mainForm.reset(item, { emitEvent: false });
    this._clientFacadeService.select(item);
  }

  disabledInputs(form$: Observable<FormGroup>): void {
    form$
      .pipe(
        map((form) => {
          return {
            fullName: <FormControl>form.get("fullName"),
          };
        }),
        filter((i) => !isNullOrUndefined(i)),
        takeUntil(this._finisher$)
      )
      .subscribe((control) => {
        control.fullName.disable();
      });
  }

  callsCombos(): void {
    const documentType$ = this._combosFacadeService.getDocumentType$().pipe(
      filter((items: ComboModel[]) => !isNullOrUndefined(items)),
      map((items: ComboModel[]) => {
        try {
          return items.filter((item: ComboModel) => item.state);
        } catch (error) {
          return items;
        }
      }),
      takeUntil(this._finisher$)
    );
    documentType$.subscribe((i: ComboModel[]) => {
      this.documentTypeCombo$.next(i);
      this.documentTypesArray = i;
    });
  }

  initForm(): UntypedFormGroup {
    this.createDate = buildCreateDate().createDate;
    this.createDateFB = buildCreateDate().createDateFB;
    return this._fb.group({
      id: null,
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      fullName: ["", [Validators.required]],
      documentType: ["", [Validators.required]],
      documentNumber: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      city: ["", [Validators.required]],
      address: ["", [Validators.required]],
      image: [""],
      state: [true],
    });
  }

  onSubmit(createDate: string, createDateFB: object) {
    if (!this.currentItem) {
      this.dataForm = {
        ...this.mainForm.getRawValue(),
        createDate,
        createDateFB,
        stateText: this.mainForm.getRawValue().state ? "Activo" : "Inactivo",
      };
    } else {
      this.dataForm = {
        ...this.mainForm.getRawValue(),
        createDate: this.currentItem.createDate,
        createDateFB: this.currentItem.createDateFB,
        stateText: this.mainForm.getRawValue().state ? "Activo" : "Inactivo",
      };
    }

    if (this.mainForm.valid) {
      this._clientFacadeService.create(this.dataForm);
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
    this.mainForm.get("documentType").setValue("");
  }

  goBack() {
    this._location.back();
  }

  private controlSubscriptions(): void {
    this.mainForm
      .get("documentType")
      .valueChanges.pipe(
        filter((value) => !isNullOrUndefined(value)),
        takeUntil(this._finisher$)
      )
      .subscribe((value: string) => {
        if (this.documentTypesArray && this.documentTypesArray.length > 0) {
          try {
            this.documentTypeCurrent = this.documentTypesArray.find(
              (i: ComboModel) => i.id === value
            );
            this.mainForm.patchValue({
              documentType: this.documentTypeCurrent
                ? this.documentTypeCurrent.name
                : null,
            });
          } catch (error) {
            return;
          }
        }
      });

    const firstNameControl$ = this.mainForm
      .get("firstName")
      .valueChanges.pipe();

    const lastNameControl$ = this.mainForm.get("lastName").valueChanges.pipe();

    const fullNameResult$ = combineLatest([
      firstNameControl$,
      lastNameControl$,
    ]);
    fullNameResult$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([firstName, lastName]) => {
          return {
            firstName,
            lastName,
          };
        }),
        takeUntil(this._finisher$)
      )
      .subscribe((data) => {
        const fullName = data.firstName + " " + data.lastName;
        const control = this.mainForm.controls["fullName"] as FormControl;
        control.setValue(fullName.trim());
      });
  }

  chargeIndicatorManager(): void {
    const isLoadingClient$ = this._clientFacadeService.getLoading$();
    const isLoadingCombos$ = this._combosFacadeService.getLoading$();

    const result$ = combineLatest([isLoadingClient$, isLoadingCombos$]).pipe(
      map(
        ([isLoadingClient, isLoadingCombos]) =>
          isLoadingClient || isLoadingCombos
      ),
      takeUntil(this._finisher$)
    );

    result$.pipe(takeUntil(this._finisher$)).subscribe((i) => {
      console.log(i)
      this.isLoading = i;
    });
  }
}
