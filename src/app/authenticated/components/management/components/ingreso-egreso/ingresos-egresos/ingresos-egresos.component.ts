import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { filter, map, takeUntil } from "rxjs/operators";
import { IngresoEgresoModel } from "@models/management/ingreso-egreso.model";
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
import { GroupModel } from "@models/shared/group.model";
import { groupBy } from "@root/core/utilities/core.utilities";

@Component({
  selector: "app-ingresos-egresos",
  templateUrl: "./ingresos-egresos.component.html",
})
export class IngresosEgresosComponent implements OnInit, OnDestroy {
  private _ingresoEgresoFacadeService = inject(IngresoEgresoFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _translateService = inject(TranslateService);
  private _modalService = inject(ModalService);
  private _location = inject(Location);
  private _router = inject(Router);
  private _finisher$ = new Subject<void>();

  public isLoading: boolean;
  public items: IngresoEgresoModel[] = [];
  public itemsGroup: GroupModel<IngresoEgresoModel>[] = [];
  public wordFilter = "";
  public wordFilterActive = false;
  public currentUser: CurrentUserModel;
  public rangeDate: RangeDate;
  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  ngOnInit() {
    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
        this.numberOfDecimal = user?.numberOfDecimal
          ? user.numberOfDecimal
          : this.numberOfDecimal;
        this.systemDecimal = user?.systemDecimal
          ? user.systemDecimal
          : this.systemDecimal;
      });

    this._ingresoEgresoFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  ngOnDestroy(): void {
    this._finisher$.next();
    this._sharedFacadeService.reset();
  }

  rangeDateReceived(rangeDate: RangeDate): void {
    this.rangeDate = rangeDate;
    setTimeout(() => {
      this.loadItems();
    }, 10);
  }

  wordFilterReceived(wordFilter: string): void {
    this.wordFilter = wordFilter;
  }

  loadItems(): void {
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
        takeUntil(this._finisher$)
      )
      .subscribe((items: IngresoEgresoModel[]) => {
        this.items = items;
        this.itemsGroup = groupBy(items, ["typeActive"]);
        console.log(this.itemsGroup);
      });
  }

  goNew(): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate(["/authenticated/management/ingreso-egreso/form"]);
    }, 0);
  }

  goEdit(item: IngresoEgresoModel): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/management/ingreso-egreso/form",
        { id: item?.id },
      ]);
    }, 0);
  }

  goDelete(item: IngresoEgresoModel): void {
    this._ingresoEgresoFacadeService.delete(item);
  }

  goBack(): void {
    this._location.back();
  }

  openModal(item: IngresoEgresoModel): void {
    const data: ModalModel<IngresoEgresoModel> = {
      type: "confirmation",
      item,
      title: this._translateService.instant("TITLES.CONFIRMATION"),
      message: this._translateService.instant("TEXTS.CONFIRMATION"),
      buttonYes: this._translateService.instant("BUTTONS.YES"),
      buttonCancel: this._translateService.instant("BUTTONS.CANCEL"),
    };
    this._modalService
      .openModal(data)
      .then((data) => {
        this.goDelete(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
