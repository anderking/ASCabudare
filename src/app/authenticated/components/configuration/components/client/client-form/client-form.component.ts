import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { ActivatedRoute, ParamMap } from "@angular/router";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { buildCreateDate } from "@root/core/utilities/core.utilities";

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
})
export class ClientCreateComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
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

  constructor(
    private _clientFacadeService: ClientFacadeService,
    private _combosFacadeService: CombosFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _location: Location,
    private _fb: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.mainForm = this.initForm();
  }

  ngOnInit() {
    this.callsCombos();
    this.chargeIndicatorManager();
    this.controlSubscriptions();

    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
      });

    const params$ = this._activatedRoute.paramMap.pipe(
      filter((params) => !isNullOrUndefinedEmpty(params)),
      map((params: ParamMap) => {
        const id = params.get("id");
        return { id };
      }),
      takeUntil(this.finisher$)
    );

    const items$ = this._clientFacadeService.getAll$().pipe(
      filter((items: ClientModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this.finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([items$, params$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([items, params, mainForm]) => {
          try {
            return {
              item: items.find((item: ClientModel) => item.id === params.id),
              params,
              mainForm,
            };
          } catch (error) {
            return {
              item: null,
              params,
              mainForm,
            };
          }
        }),
        takeUntil(this.finisher$)
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
        takeUntil(this.finisher$)
      )
      .subscribe((currentItem) => {
        console.log("currentItem", currentItem);
        this.currentItem = currentItem;
      });

    this._sharedFacadeService
      .getMessage$()
      .pipe(
        filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)),
        takeUntil(this.finisher$)
      )
      .subscribe(() => {
        if (!this.currentItem) {
          this.clean();
        }
      });

    this.disabledInputs(mainForm$);
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this.finisher$.next();
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
        takeUntil(this.finisher$)
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
      takeUntil(this.finisher$)
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
    return getErrorMessageField(field, this.mainForm);
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
        takeUntil(this.finisher$)
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
        takeUntil(this.finisher$)
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
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
