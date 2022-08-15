import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
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

@Component({
  selector: "app-ingreso-egreso-form",
  templateUrl: "./ingreso-egreso-form.component.html",
  styles: [],
})
export class IngresoEgresoCreateComponent implements OnInit, OnDestroy {
  public mainForm: FormGroup;
  public dataForm: IngresoEgresoModel = {
    id: "",
    description: "",
    amount: null,
    idTypeActive: "",
  };
  public isLoading: boolean;
  public typeActivesArray: ComboModel[];
  public typeActiveCurrent: ComboModel;
  public typeActiveCombo$ = new BehaviorSubject<ComboModel[]>([]);
  public idTypeActive: string = "";
  private _finisher = new Subject<void>();

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _combosFacadeService: CombosFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _fb: FormBuilder
  ) {
    this.mainForm = this.initForm();
    //console.log(this.mainForm);
  }

  ngOnInit() {
    this.callsCombos();
    this._ingresoEgresoFacadeService
      .getLoading$()
      .pipe(
        filter((loading: boolean) => !isNullOrUndefined(loading)),
        takeUntil(this._finisher)
      )
      .subscribe((loading: boolean) => {
        console.log("loading", loading);
        this.isLoading = loading;
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
    this._finisher.next();
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
      takeUntil(this._finisher)
    );
    typeActive$.subscribe((i: ComboModel[]) => {
      //console.log(i);
      this.typeActiveCombo$.next(i);
      this.typeActivesArray = i;
    });
  }

  initForm(): FormGroup {
    return this._fb.group({
      idTypeActive: ["", [Validators.required]],
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
    this.dataForm = { id: UUID.UUID(), ...this.mainForm.getRawValue() };
    console.log(this.mainForm.controls);
    if (this.mainForm.valid) {
      console.log(this.dataForm);
      this._ingresoEgresoFacadeService.createSecond(this.dataForm);
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

  back() {
    this._location.back();
  }
}
