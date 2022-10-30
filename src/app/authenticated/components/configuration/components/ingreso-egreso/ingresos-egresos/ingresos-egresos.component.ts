import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  isNullOrUndefined,
  isNullOrUndefinedEmpty,
} from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";

@Component({
  selector: "app-ingresos-egresos",
  templateUrl: "./ingresos-egresos.component.html",
  styleUrls: ["./ingresos-egresos.component.scss"],
})
export class IngresosEgresosComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  public items: IngresoEgresoModel[] = [];
  public wordFilter = "";
  public currentUser: CurrentUserModel;
  private _finisher = new Subject<void>();

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _location: Location,
    private _router: Router
  ) {}

  ngOnInit() {
    this._ingresoEgresoFacadeService.search();
    this._ingresoEgresoFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._ingresoEgresoFacadeService
      .getAll$()
      .pipe(
        filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
        tap((items: IngresoEgresoModel[]) => console.log(items)),
        takeUntil(this._finisher)
      )
      .subscribe((items: IngresoEgresoModel[]) => {
        this.items = items;
      });

    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy(): void {
    this._finisher.next();
    this._ingresoEgresoFacadeService.reset();
    this._sharedFacadeService.reset();
  }

  goDelete(item: IngresoEgresoModel): void {
    this._ingresoEgresoFacadeService.delete(item);
  }

  goNew(): void {
    this._router.navigate(["/authenticated/configuration/ingreso-egreso/form"]);
  }
  goEdit(item: IngresoEgresoModel): void {
    this._router.navigate([
      "/authenticated/configuration/ingreso-egreso/form",
      { id: item?.id },
    ]);
  }
  goBack(): void {
    this._location.back();
  }
}
