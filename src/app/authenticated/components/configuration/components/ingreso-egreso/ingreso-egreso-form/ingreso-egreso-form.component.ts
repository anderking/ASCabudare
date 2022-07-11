import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Subject, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { IngresoEgresoModel } from "@models/ingreso-egreso.model";
import { filter, takeUntil } from "rxjs/operators";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-ingreso-egreso-form",
  templateUrl: "./ingreso-egreso-form.component.html",
  styles: [],
})
export class IngresoEgresoCreateComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public type = "ingreso";
  public isLoading: boolean;
  private _finisher = new Subject<void>();

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      description: new FormControl("", Validators.required),
      amount: new FormControl(0, Validators.min(0)),
    });
    this._sharedFacadeService.getLoading$().subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy() {
    this._finisher.next();
    this._ingresoEgresoFacadeService.reset();
    this._sharedFacadeService.reset();
  }

  onSubmit() {
    const ingresoEgreso: IngresoEgresoModel = {
      ...this.formGroup.value,
      type: this.type,
    };
    this._ingresoEgresoFacadeService.create(ingresoEgreso);
  }
}
