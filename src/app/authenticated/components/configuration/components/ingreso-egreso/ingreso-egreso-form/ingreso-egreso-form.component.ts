import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { IngresoEgresoModel } from "@models/ingreso-egreso.model";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { ComboModel } from "@models/masters/combo.model";

@Component({
  selector: "app-ingreso-egreso-form",
  templateUrl: "./ingreso-egreso-form.component.html",
  styles: [],
})
export class IngresoEgresoCreateComponent implements OnInit, OnDestroy {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;
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
  public idTypeActive:string = "";
  private _finisher = new Subject<void>();

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _combosFacadeService: CombosFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {
    this.callsCombos();
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
      console.log(i);
      this.typeActiveCombo$.next(i);
      this.typeActivesArray = i;
    });
  }

  ngOnInit() {
    this._sharedFacadeService
      .getLoading$()
      .pipe(
        filter((loading: boolean) => !isNullOrUndefined(loading)),
        takeUntil(this._finisher)
      )
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._combosFacadeService.reset();
    this._finisher.next();
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.form.getRawValue() };
    if (this.mainForm.form.valid) {
      console.log(this.dataForm);
      this._ingresoEgresoFacadeService.create(this.dataForm);
    }
  }

  clean(){
    this.mainForm.reset();
    this.dataForm = {
      id: "",
      description: "",
      amount: null,
      idTypeActive: "",
    };
  }
}
