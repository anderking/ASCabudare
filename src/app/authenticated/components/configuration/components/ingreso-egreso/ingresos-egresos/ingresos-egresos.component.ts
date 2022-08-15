import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { filter, takeUntil, tap } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";

@Component({
  selector: "app-ingresos-egresos",
  templateUrl: "./ingresos-egresos.component.html",
  styleUrls: ["./ingresos-egresos.component.scss"],
})
export class IngresosEgresosComponent implements OnInit {
  public isLoading: boolean;
  public items: IngresoEgresoModel[] = [];
  private _finisher = new Subject<void>();

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {
    
  }

  ngOnInit() {
    this._ingresoEgresoFacadeService.search()
    this._sharedFacadeService.getLoading$().subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this._ingresoEgresoFacadeService
      .getAll$()
      .pipe(
        filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
        tap((items: IngresoEgresoModel[]) => console.log(items))
      )
      .subscribe((items: IngresoEgresoModel[]) => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
    this._finisher.next();
    this._ingresoEgresoFacadeService.reset();
    this._sharedFacadeService.reset();
  }

  delete(item: IngresoEgresoModel) {
    this._ingresoEgresoFacadeService.delete(item);
  }
}
