import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, map, takeUntil } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { RangeDate } from "@models/shared/filter.model";
import { ModalModel } from "@models/shared/modal.model";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "@services/ui/modal.service";

@Component({
  selector: "app-ingresos-egresos",
  templateUrl: "./ingresos-egresos.component.html",
})
export class IngresosEgresosComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  public items: IngresoEgresoModel[] = [];
  public wordFilter = "";
  public wordFilterActive = false;
  public currentUser: CurrentUserModel;
  public rangeDate: RangeDate;
  public numberOfDecimal: string = "2";
  public decimePipe: string = "1.2-2";
  private _finisher = new Subject<void>();

  constructor(
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _authFacadeService: AuthFacadeService,
    private _location: Location,
    private _router: Router,
    private translateService: TranslateService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
        this.numberOfDecimal =
          user && user.numberOfDecimal
            ? user.numberOfDecimal
            : this.numberOfDecimal;
        this.decimePipe = this.numberOfDecimal
          ? `1.${this.numberOfDecimal}-${this.numberOfDecimal}`
          : this.decimePipe;
      });

    this._ingresoEgresoFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  ngOnDestroy(): void {
    this._finisher.next();
    this._sharedFacadeService.reset();
  }

  public rangeDateReceived(rangeDate: RangeDate): void {
    this.rangeDate = rangeDate;
    setTimeout(() => {
      this.loadItems();
    }, 10);
  }

  public wordFilterReceived(wordFilter: string): void {
    this.wordFilter = wordFilter;
  }

  public loadItems(): void {
    this._ingresoEgresoFacadeService
      .getAll$()
      .pipe(
        filter((items: IngresoEgresoModel[]) => !isNullOrUndefinedEmpty(items)),
        map((items: IngresoEgresoModel[]) => {
          try {
            return items.filter((item: IngresoEgresoModel) => {
              if (this.rangeDate) {
                const createDate = new Date(item.createDate).getTime();
                const startDate = new Date(this.rangeDate?.startDate).getTime();
                const endDate = new Date(this.rangeDate?.endDate).getTime();
                if (createDate >= startDate && createDate <= endDate) {
                  return true;
                } else {
                  return false;
                }
              }
            });
          } catch (error) {
            return items;
          }
        }),
        takeUntil(this._finisher)
      )
      .subscribe((items: IngresoEgresoModel[]) => {
        this.items = items;
      });
  }

  public goDelete(item: IngresoEgresoModel): void {
    this._ingresoEgresoFacadeService.delete(item);
  }

  public goNew(): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/configuration/ingreso-egreso/form",
      ]);
    }, 0);
  }
  public goEdit(item: IngresoEgresoModel): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/configuration/ingreso-egreso/form",
        { id: item?.id },
      ]);
    }, 0);
  }
  public goBack(): void {
    this._location.back();
  }

  public openModal(item: IngresoEgresoModel): void {
    const data: ModalModel<IngresoEgresoModel> = {
      type: "confirmation",
      item,
      title: this.translateService.instant("TITLES.CONFIRMATION"),
      message: this.translateService.instant("TEXTS.CONFIRMATION"),
      buttonYes: this.translateService.instant("BUTTONS.YES"),
      buttonCancel: this.translateService.instant("BUTTONS.CANCEL"),
    };
    this.modalService
      .openModal(data)
      .then((data) => {
        this.goDelete(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
