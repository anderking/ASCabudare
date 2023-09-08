import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
import { BehaviorSubject, combineLatest, of, Subject } from "rxjs";
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
import { ActivatedRoute, ParamMap } from "@angular/router";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { ClientFacadeService } from "@facades/client-facade.service";
import { ClientModel } from "@models/configurations/client.model";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { orderBy } from "@root/core/utilities/core.utilities";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-lending-form",
  templateUrl: "./lending-form.component.html",
})
export class LendingFormComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public mainForm: UntypedFormGroup;
  public dataForm: LendingModel;
  public currentItem: LendingModel;
  public isLoading: boolean;
  public typeActivesArray: ComboModel[] = [];
  public typeActiveCurrent: ComboModel;
  public typeActiveCombo$ = new BehaviorSubject<ComboModel[]>([]);
  public clientsArray: any[] = [];
  public clientCurrent: ClientModel;
  public clientCombo$ = new BehaviorSubject<ClientModel[]>([]);
  public currentUser: CurrentUserModel;
  public createDateFB: object = null;
  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  constructor(
    private _lendingFacadeService: LendingFacadeService,
    private _clientFacadeService: ClientFacadeService,
    private _combosFacadeService: CombosFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _location: Location,
    private _fb: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.mainForm = this.initForm();
  }

  ngOnInit() {
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

    const params$ = this._activatedRoute.paramMap.pipe(
      filter((params) => !isNullOrUndefinedEmpty(params)),
      map((params: ParamMap) => {
        const id = params.get("id");
        return { id };
      }),
      takeUntil(this.finisher$)
    );

    const items$ = this._lendingFacadeService.getAll$().pipe(
      filter((items: LendingModel[]) => !isNullOrUndefinedEmpty(items)),
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
              item: items.find((item: LendingModel) => item.id === params.id),
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
    this.finisher$.next();
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
    const createDateISO: string = new Date().toISOString();
    const createDate = createDateISO.split("T")[0];
    const hoursISO = createDateISO.split("T")[1];
    const hours = hoursISO.split(".")[0];
    const newDate = createDate + "T" + hours;
    const date = new Date(newDate);
    this.createDateFB = date;

    return this._fb.group({
      id: null,
      idClient: ["", [Validators.required]],
      client: ["", [Validators.required]],
      idTypeActive: ["", [Validators.required]],
      typeActive: ["", [Validators.required]],
      createDate: [
        new Date().toLocaleDateString("en-CA"),
        [Validators.required],
      ],
      amount: [
        "",
        [Validators.required, Validators.pattern(`^[0-9]+(.[0-9]+)?$`)],
      ],
      description: ["", [Validators.required, Validators.maxLength(700)]],
      state: [true],
    });
  }

  onSubmit(createDateFB: object) {
    this.dataForm = {
      ...this.mainForm.getRawValue(),
      createDateFB,
      stateText: this.mainForm.getRawValue().state ? "Activa" : "Inactiva",
    };
    console.log(this.dataForm);
    if (this.mainForm.valid) {
      this._lendingFacadeService.create(this.dataForm);
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm, this.translateService);
  }

  clean() {
    this.mainForm.reset({ state: true });
    this.mainForm.get("idClient").setValue("");
    this.mainForm.get("idTypeActive").setValue("");
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