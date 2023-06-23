import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
import { BehaviorSubject, combineLatest, of, Subject } from "rxjs";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
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
import { CategoryFacadeService } from "@facades/category-facade.service";
import { CategoryModel } from "@models/configurations/category.model";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { oderBy } from "@root/core/utilities/core.utilities";

@Component({
  selector: "app-ingreso-egreso-form",
  templateUrl: "./ingreso-egreso-form.component.html",
})
export class IngresoEgresoCreateComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public mainForm: UntypedFormGroup;
  public dataForm: IngresoEgresoModel;
  public currentItem: IngresoEgresoModel;
  public isLoading: boolean;
  public typeActivesArray: ComboModel[] = [];
  public typeActiveCurrent: ComboModel;
  public typeActiveCombo$ = new BehaviorSubject<ComboModel[]>([]);
  public categorysArray: any[] = [];
  public categoryCurrent: CategoryModel;
  public categoryCombo$ = new BehaviorSubject<CategoryModel[]>([]);
  public currentUser: CurrentUserModel;
  public createDateFB: object = null;

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _categoryFacadeService: CategoryFacadeService,
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

    const items$ = this._ingresoEgresoFacadeService.getAll$().pipe(
      filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
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
              item: items.find(
                (item: IngresoEgresoModel) => item.id === params.id
              ),
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

    this._ingresoEgresoFacadeService
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

  selectCurrentItem(item: IngresoEgresoModel): void {
    this.mainForm.reset(item, { emitEvent: false });
    this._ingresoEgresoFacadeService.select(item);
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

    const category$ = this._categoryFacadeService.getAll$().pipe(
      filter((items: CategoryModel[]) => !isNullOrUndefined(items)),
      map((items: CategoryModel[]) => {
        try {
          return items.filter((item: CategoryModel) => item.state);
        } catch (error) {
          return items;
        }
      }),
      map((items: CategoryModel[]) => {
        try {
          return oderBy(items, "name");
        } catch (error) {
          return items;
        }
      }),
      takeUntil(this.finisher$)
    );
    category$.subscribe((i: CategoryModel[]) => {
      this.categoryCombo$.next(i);
      this.categorysArray = i;
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
      idCategory: ["", [Validators.required]],
      category: ["", [Validators.required]],
      idTypeActive: ["", [Validators.required]],
      typeActive: ["", [Validators.required]],
      createDate: [
        new Date().toLocaleDateString("en-CA"),
        [Validators.required],
      ],
      amount: [
        "",
        [
          Validators.required,
          Validators.pattern("^([0-9]{1,10}(.[0-9]{1,2})?)$"),
        ],
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
    if (this.mainForm.valid) {
      console.log(this.dataForm);
      this._ingresoEgresoFacadeService.create(this.dataForm);
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
  }

  clean() {
    console.log("paso");
    this.mainForm.reset({ state: true });
    this.mainForm.get("idCategory").setValue("");
    this.mainForm.get("idTypeActive").setValue("");
    this.mainForm
      .get("createDate")
      .setValue(new Date().toLocaleDateString("en-CA"));
  }

  goBack() {
    console.log("paso");
    this._location.back();
  }

  private controlSubscriptions(): void {
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
      .get("idCategory")
      .valueChanges.pipe(
        filter((value) => !isNullOrUndefined(value)),
        takeUntil(this.finisher$)
      )
      .subscribe((value: string) => {
        if (this.categorysArray && this.categorysArray.length > 0) {
          try {
            this.categoryCurrent = this.categorysArray.find(
              (i: CategoryModel) => i.id === value
            );
            this.mainForm.patchValue({
              category: this.categoryCurrent ? this.categoryCurrent.name : null,
            });
          } catch (error) {
            return;
          }
        }
      });
  }

  chargeIndicatorManager(): void {
    const isLoadingIngresoEgreso$ =
      this._ingresoEgresoFacadeService.getLoading$();
    const isLoadingCategory$ = this._categoryFacadeService.getLoading$();
    const isLoadingCombos$ = this._combosFacadeService.getLoading$();

    const result$ = combineLatest([
      isLoadingIngresoEgreso$,
      isLoadingCategory$,
      isLoadingCombos$,
    ]).pipe(
      map(
        ([isLoadingIngresoEgreso, isLoadingCategory, isLoadingCombos]) =>
          isLoadingIngresoEgreso || isLoadingCategory || isLoadingCombos
      ),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
