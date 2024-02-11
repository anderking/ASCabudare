import { Component, OnInit, OnDestroy, inject, Input } from "@angular/core";
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BehaviorSubject, combineLatest, Observable, of, Subject } from "rxjs";
import { LendingFacadeService } from "@facades/lending-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { LendingModel } from "@models/management/lending.model";
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
import { ClientFacadeService } from "@facades/client-facade.service";
import { ClientModel } from "@models/configurations/client.model";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { buildCreateDate, orderBy } from "@root/core/utilities/core.utilities";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-lending-form",
  templateUrl: "./lending-form.component.html",
})
export class LendingFormComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  @Input() idClient?: string;

  private _lendingFacadeService = inject(LendingFacadeService);
  private _clientFacadeService = inject(ClientFacadeService);
  private _combosFacadeService = inject(CombosFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _location = inject(Location);
  private _fb = inject(UntypedFormBuilder);
  private _translateService = inject(TranslateService);
  private finisher$ = new Subject<void>();

  public mainForm: UntypedFormGroup;
  public dataForm: LendingModel;
  public currentItem: LendingModel;
  public isLoading: boolean;
  public typeActivesArray: ComboModel[] = [];
  public typeActiveCurrent: ComboModel;
  public typeActiveCombo$ = new BehaviorSubject<ComboModel[]>([]);
  public stateSolvencysArray: ComboModel[] = [];
  public stateSolvencyCurrent: ComboModel;
  public stateSolvencyCombo$ = new BehaviorSubject<ComboModel[]>([]);
  public clientsArray: any[] = [];
  public clientCurrent: ClientModel;
  public clientCombo$ = new BehaviorSubject<ClientModel[]>([]);
  public currentUser: CurrentUserModel;
  public createDate: string = null;
  public createDateFB: object = null;
  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  ngOnInit() {
    this.mainForm = this.initForm();
    this.callsCombos();
    this.chargeIndicatorManager();
    this.controlSubscriptions();

    this._authFacadeService
      .getCurrentUser$()
      .pipe(takeUntil(this.finisher$))
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
        this.numberOfDecimal = user?.numberOfDecimal
          ? user.numberOfDecimal
          : this.numberOfDecimal;
        this.systemDecimal = user?.systemDecimal
          ? user.systemDecimal
          : this.systemDecimal;
      });

    const items$ = this._lendingFacadeService.getAll$().pipe(
      filter((items: LendingModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this.finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([items$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([items, mainForm]) => {
          try {
            return {
              item: items.find((item: LendingModel) => item.id === this.id),
              mainForm,
            };
          } catch (error) {
            return {
              item: null,
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
        if (this.idClient || (this.id && this.idClient)) {
          this.disabledInputs(of(data.mainForm), this.idClient);
        }
      });

    this._lendingFacadeService
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
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._lendingFacadeService.resetSelected();
    this.finisher$.next();
  }

  disabledInputs(form$: Observable<FormGroup>, id: string): void {
    form$
      .pipe(
        map((form) => {
          return {
            idClient: <FormControl>form.get("idClient"),
          };
        }),
        filter((i) => !isNullOrUndefined(i)),
        takeUntil(this.finisher$)
      )
      .subscribe((control) => {
        control.idClient.disable();
        control.idClient.setValue(id);
      });
  }

  selectCurrentItem(item: LendingModel): void {
    this.mainForm.reset(item, { emitEvent: false });
    this._lendingFacadeService.select(item);
  }

  /**
   * Se llaman a todas los subjects que se deseen manipular en el componente
   */
  callsCombos(): void {
    const typeActive$ = this._combosFacadeService.getTypeActive$().pipe(
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
    typeActive$.subscribe((i: ComboModel[]) => {
      this.typeActiveCombo$.next(i);
      this.typeActivesArray = i;
    });

    const stateSolvency$ = this._combosFacadeService.getStateSolvency$().pipe(
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
    stateSolvency$.subscribe((i: ComboModel[]) => {
      this.stateSolvencyCombo$.next(i);
      this.stateSolvencysArray = i;
    });

    const client$ = this._clientFacadeService.getAll$().pipe(
      filter((items: ClientModel[]) => !isNullOrUndefined(items)),
      map((items: ClientModel[]) => {
        try {
          return items.filter((item: ClientModel) => item.state);
        } catch (error) {
          return items;
        }
      }),
      map((items: ClientModel[]) => {
        try {
          return orderBy(items, "name");
        } catch (error) {
          return items;
        }
      }),
      takeUntil(this.finisher$)
    );
    client$.subscribe((i: ClientModel[]) => {
      this.clientCombo$.next(i);
      this.clientsArray = i;
    });
  }

  initForm(): UntypedFormGroup {
    this.createDate = buildCreateDate().createDate;
    this.createDateFB = buildCreateDate().createDateFB;
    return this._fb.group({
      id: null,
      idClient: ["", [Validators.required]],
      client: ["", [Validators.required]],
      idTypeActive: ["", [Validators.required]],
      typeActive: ["", [Validators.required]],
      idStateSolvency: ["", [Validators.required]],
      stateSolvency: ["", [Validators.required]],
      amount: [
        "",
        [Validators.required, Validators.pattern(`^[0-9]+(.[0-9]+)?$`)],
      ],
      description: ["", [Validators.required, Validators.maxLength(700)]],
      state: [true],
    });
  }

  onSubmit(createDate: string, createDateFB: object) {
    if (!this.currentItem) {
      this.dataForm = {
        ...this.mainForm.getRawValue(),
        createDate,
        createDateFB,
        stateText: this.mainForm.getRawValue().state ? "Activa" : "Inactiva",
      };
    } else {
      this.dataForm = {
        ...this.mainForm.getRawValue(),
        createDate: this.currentItem.createDate,
        createDateFB: this.currentItem.createDateFB,
        stateText: this.mainForm.getRawValue().state ? "Activa" : "Inactiva",
      };
    }
    console.log(this.dataForm);
    if (this.mainForm.valid) {
      this._lendingFacadeService.create(this.dataForm);
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
    this.mainForm.get("idClient").setValue("");
    this.mainForm.get("idTypeActive").setValue("");
    this.mainForm.get("idStateSolvency").setValue("");
    this.mainForm
      .get("createDate")
      .setValue(new Date().toLocaleDateString("en-CA"));
  }

  goBack() {
    this._location.back();
  }

  controlSubscriptions(): void {
    this.mainForm
      .get("idTypeActive")
      .valueChanges.pipe(
        filter((value) => !isNullOrUndefined(value)),
        takeUntil(this.finisher$)
      )
      .subscribe((value: string) => {
        if (this.typeActivesArray && this.typeActivesArray.length > 0) {
          try {
            this.typeActiveCurrent = this.typeActivesArray.find(
              (i: ComboModel) => i.id === value
            );
            this.mainForm.patchValue({
              typeActive: this.typeActiveCurrent
                ? this.typeActiveCurrent.name
                : null,
            });
          } catch (error) {
            return;
          }
        }
      });

    this.mainForm
      .get("idStateSolvency")
      .valueChanges.pipe(
        filter((value) => !isNullOrUndefined(value)),
        takeUntil(this.finisher$)
      )
      .subscribe((value: string) => {
        if (this.stateSolvencysArray && this.stateSolvencysArray.length > 0) {
          try {
            this.stateSolvencyCurrent = this.stateSolvencysArray.find(
              (i: ComboModel) => i.id === value
            );
            this.mainForm.patchValue({
              stateSolvency: this.stateSolvencyCurrent
                ? this.stateSolvencyCurrent.name
                : null,
            });
          } catch (error) {
            return;
          }
        }
      });

    this.mainForm
      .get("idClient")
      .valueChanges.pipe(
        filter((value) => !isNullOrUndefined(value)),
        takeUntil(this.finisher$)
      )
      .subscribe((value: string) => {
        if (this.clientsArray && this.clientsArray.length > 0) {
          try {
            this.clientCurrent = this.clientsArray.find(
              (i: ClientModel) => i.id === value
            );
            this.mainForm.patchValue({
              client: this.clientCurrent ? this.clientCurrent.fullName : null,
            });
          } catch (error) {
            return;
          }
        }
      });
  }

  chargeIndicatorManager(): void {
    const isLoadingLending$ = this._lendingFacadeService.getLoading$();
    const isLoadingClient$ = this._clientFacadeService.getLoading$();
    const isLoadingCombos$ = this._combosFacadeService.getLoading$();

    const result$ = combineLatest([
      isLoadingLending$,
      isLoadingClient$,
      isLoadingCombos$,
    ]).pipe(
      map(
        ([isLoadingLending, isLoadingClient, isLoadingCombos]) =>
          isLoadingLending || isLoadingClient || isLoadingCombos
      ),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
