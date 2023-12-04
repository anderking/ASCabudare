import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { filter, map, takeUntil } from "rxjs/operators";
import { LendingModel } from "@models/management/lending.model";
import { LendingFacadeService } from "@facades/lending-facade.service";
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
  selector: "app-lendings",
  templateUrl: "./lendings.component.html",
})
export class LendingsComponent implements OnInit, OnDestroy {
  private _lendingFacadeService = inject(LendingFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private translateService = inject(TranslateService);
  private modalService = inject(ModalService);
  private _location = inject(Location);
  private _router = inject(Router);
  private _finisher$ = new Subject<void>();

  public isLoading: boolean;
  public items: LendingModel[] = [];
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

    this._lendingFacadeService
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
    this._lendingFacadeService
      .getAll$()
      .pipe(
        filter((items: LendingModel[]) => !isNullOrUndefinedEmpty(items)),
        map((items: LendingModel[]) => {
          try {
            return items.filter((item: LendingModel) => {
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
      .subscribe((items: LendingModel[]) => {
        this.items = items;
      });
  }

  goNew(): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate(["/authenticated/management/lending/form"]);
    }, 0);
  }

  goEdit(item: LendingModel): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/management/lending/form",
        { id: item?.id },
      ]);
    }, 0);
  }

  goBack(): void {
    this._location.back();
  }

  goDelete(item: LendingModel): void {
    this._lendingFacadeService.delete(item);
  }

  openModal(item: LendingModel): void {
    const data: ModalModel<LendingModel> = {
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
