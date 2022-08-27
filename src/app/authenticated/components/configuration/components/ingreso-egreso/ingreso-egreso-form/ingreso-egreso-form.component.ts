import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import {
  BehaviorSubject,
  combineLatest,
  of,
  Subject,
  Subscription,
} from "rxjs";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { IngresoEgresoModel } from "@models/ingreso-egreso.model";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { ComboModel } from "@models/masters/combo.model";
import { Location } from "@angular/common";
import {
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { UUID } from "angular2-uuid";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";

@Component({
  selector: "app-ingreso-egreso-form",
  templateUrl: "./ingreso-egreso-form.component.html",
  styles: [],
})
export class IngresoEgresoCreateComponent implements OnInit, OnDestroy {
  private _finisher$ = new Subject<void>();
  public mainForm: FormGroup;
  public dataForm: IngresoEgresoModel;
  public isLoading: boolean;
  public typeActivesArray: ComboModel[];
  public typeActiveCurrent: ComboModel;
  public typeActiveCombo$ = new BehaviorSubject<ComboModel[]>([]);

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _combosFacadeService: CombosFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.mainForm = this.initForm();
  }

  ngOnInit() {
    this.callsCombos();
    this.controlSubscriptions();

    this._ingresoEgresoFacadeService
      .getLoading$()
      .pipe(
        filter((loading: boolean) => !isNullOrUndefined(loading)),
        takeUntil(this._finisher$)
      )
      .subscribe((loading: boolean) => {
        console.log("loading", loading);
        this.isLoading = loading;
      });

    const params$ = this._activatedRoute.paramMap.pipe(
      filter((params) => !isNullOrUndefined(params)),
      map((params: ParamMap) => {
        const id = params.get("id");
        return { id };
      }),
      tap((item: any) => {
        console.log(item);
        if (item.id) {
          this._ingresoEgresoFacadeService.searchOne(item);
        }
      }),
      takeUntil(this._finisher$)
    );

    const items$ = this._ingresoEgresoFacadeService.getAll$().pipe(
      filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this._finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([items$, params$, mainForm$]);

    results$
      .pipe(
        tap((x) => console.log("COMBINELATEST", x)),
        map(([items, params, mainForm]) => {
          return {
            item: items.find(
              (item: IngresoEgresoModel) => item.id == params.id
            ),
            params,
            mainForm,
          };
        }),
        takeUntil(this._finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        if (data.item) {
          this.selectCurrentItem(data.item);
        }
      });
  }

  ngAfterViewInit(): void {
    this._sharedFacadeService
      .getMessage$()
      .pipe(filter((message) => message !== null))
      .subscribe((message) => {
        console.log("message", message);
        this.clean();
        this._sharedFacadeService.reset();
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._combosFacadeService.reset();
    this._ingresoEgresoFacadeService.reset();
    this._finisher$.next();
  }

  selectCurrentItem(item: IngresoEgresoModel): void {
    console.log("CURRENT ITEM", item);
    this.mainForm.reset(item, { emitEvent: false });
    this._ingresoEgresoFacadeService.select(item);
  }

  /**
   * Se llaman a todas los subjects que se deseen manipular en el componente
   * @returns {void}
   */
  callsCombos(): void {
    this._combosFacadeService.searchTypeActive();

    const typeActive$ = this._combosFacadeService.getTypeActive$().pipe(
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
    typeActive$.subscribe((i: ComboModel[]) => {
      //console.log(i);
      this.typeActiveCombo$.next(i);
      this.typeActivesArray = i;
    });
  }

  initForm(): FormGroup {
    return this._fb.group({
      id: null,
      idTypeActive: ["", [Validators.required]],
      typeActive: ["", [Validators.required]],
      amount: [
        "",
        [
          Validators.required,
          Validators.pattern("^([0-9]{1,10}(.[0-9]{1,2})?)$"),
        ],
      ],
      description: ["", [Validators.required, Validators.maxLength(700)]],
    });
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.getRawValue() };
    console.log(this.mainForm.controls);
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
    this.mainForm.reset();
  }

  goBack() {
    this._location.back();
  }

  private controlSubscriptions(): void {
    this.mainForm
      .get("idTypeActive")
      .valueChanges.pipe(
        filter((value) => !isNullOrUndefined(value)),
        takeUntil(this._finisher$)
      )
      .subscribe((value: string) => {
        console.log(value);
        console.log(this.typeActivesArray);
        if (this.typeActivesArray && this.typeActivesArray.length > 0) {
          try {
            this.typeActiveCurrent = this.typeActivesArray.find(
              (i: ComboModel) => i.id === value
            );
            this.mainForm.patchValue({
              typeActive:
                this.typeActiveCurrent && this.typeActiveCurrent.name
                  ? this.typeActiveCurrent.name
                  : null,
            });
          } catch (error) {
            return;
          }
        }
      });
  }
}
