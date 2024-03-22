import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { filter, map, takeUntil } from "rxjs/operators";
import { PayModel } from "@models/management/pay.model";
import { PayFacadeService } from "@facades/pay-facade.service";
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
  selector: "app-pays",
  templateUrl: "./pays.component.html",
})
export class PaysComponent implements OnInit, OnDestroy {
  private _payFacadeService = inject(PayFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _translateService = inject(TranslateService);
  private _modalService = inject(ModalService);
  private _location = inject(Location);
  private _router = inject(Router);
  private _finisher$ = new Subject<void>();

  public isLoading: boolean;
  public items: PayModel[] = [];
  public itemsGroup: GroupModel<PayModel>[] = [];
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

    this._payFacadeService
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
    this._payFacadeService
      .getAll$()
      .pipe(
        filter((items: PayModel[]) => !isNullOrUndefinedEmpty(items)),
        map((items: PayModel[]) => {
          try {
            return items.filter((item: PayModel) => {
              if (this.rangeDate) {
                const createDate = new Date(item.createDate).getTime();
                const startDateZ = this.rangeDate?.startDate;
                const startDate = new Date(startDateZ).getTime();
                const endDateZ = this.rangeDate?.endDate;
                const endDate = new Date(endDateZ).getTime();
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
      .subscribe((items: PayModel[]) => {
        this.items = items;
        this.itemsGroup = groupBy(items, ["currency"]);
        console.log(this.itemsGroup);
      });
  }

  goNew(): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate(["/authenticated/management/pay/form"]);
    }, 0);
  }

  goShow(item: PayModel): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/management/pay/show",
        { id: item?.id },
      ]);
    }, 0);
  }

  goDelete(item: PayModel): void {
    this._payFacadeService.delete(item);
  }

  goBack(): void {
    this._location.back();
  }

  openModal(item: PayModel): void {
    const data: ModalModel<PayModel> = {
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
