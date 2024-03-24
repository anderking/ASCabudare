import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { combineLatest, Subject } from "rxjs";
import { filter, first, map, takeUntil } from "rxjs/operators";
import { PayModel } from "@models/management/pay.model";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { CurrentFilterModel, RangeDate } from "@models/shared/filter.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { FilterTableSearchPipe } from "@root/core/pipes/filter-table-search.pipe";
import { UrlService } from "@services/ui/url-service.service";
import { PayFacadeService } from "@facades/pay-facade.service";
import { groupBy, groupByMult } from "@root/core/utilities/core.utilities";
import { GroupModel } from "@models/shared/group.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _payFacadeService = inject(PayFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _filterTableSearchPipe = inject(FilterTableSearchPipe);
  private _urlService = inject(UrlService);
  private _finisher$ = new Subject<void>();

  public wordFilter = "";
  public items: GroupModel<PayModel>[] = [];
  public itemsTwo: GroupModel<GroupModel<PayModel>>[] = [];
  public pays: PayModel[] = [];
  public isLoading: boolean;
  public totalIngresos: number;
  public totalEgresos: number;
  public totalEarnings: number;
  public cantIngresos: any;
  public cantEgresos: any;
  public currentUser: CurrentUserModel;
  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";
  private rangeDate: RangeDate;

  ngOnInit() {
    const previousUrl = this._urlService.getPreviousUrl();
    if (previousUrl && (previousUrl.includes("/form") || previousUrl.includes("/show"))) {
      this._payFacadeService
        .getCurrentFilter$()
        .pipe(
          first(
            (currentFilter: CurrentFilterModel) =>
              !isNullOrUndefinedEmpty(currentFilter)
          ),
          takeUntil(this._finisher$)
        )
        .subscribe((currentFilter: CurrentFilterModel) => {
          const payload: CurrentFilterModel = {
            rangeDate: currentFilter.rangeDate,
            wordFilter: "",
          };
          this._payFacadeService.setCurrentFilter(payload);
        });
    }
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

    this.chargeIndicatorManager();
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

  loadItems(): void {
    const items$ = this._payFacadeService.getAll$().pipe(
      filter((items: PayModel[]) => !isNullOrUndefinedEmpty(items)),
      map((items: PayModel[]) => {
        try {
          return items.filter((item: PayModel) => item.state);
        } catch (error) {
          return items;
        }
      }),
      map((items: PayModel[]) => {
        try {
          return items.filter((item: PayModel) => {
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
    );

    const results$ = combineLatest([items$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([pays]) => {
          try {
            return {
              pays,
            };
          } catch (error) {
            return {
              pays: [],
            };
          }
        }),
        takeUntil(this._finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        const pays = this._filterTableSearchPipe.transform(
          data.pays,
          {
            displayName: this.wordFilter,
            documentNumber: this.wordFilter,
            phoneNumberArea: this.wordFilter,
            phoneNumber: this.wordFilter,
            payType: this.wordFilter,
            currency: this.wordFilter,
            amount: this.wordFilter,
            stateSolvency: this.wordFilter,
          },
          false
        );
        this.pays = pays;
        this.calculateRender(pays);
      });
  }

  wordFilterReceived(wordFilter: string): void {
    this.wordFilter = wordFilter;
    const pays = this._filterTableSearchPipe.transform(
      this.pays,
      {
        displayName: this.wordFilter,
        documentNumber: this.wordFilter,
        phoneNumberArea: this.wordFilter,
        phoneNumber: this.wordFilter,
        payType: this.wordFilter,
        currency: this.wordFilter,
        amount: this.wordFilter,
        stateSolvency: this.wordFilter,
      },
      false
    );
    this.calculateRender(pays);
  }

  calculateRender(pays: PayModel[]): void {
    this.calculate(pays);
    this.items = groupBy(pays, ["payType"]);
    this.itemsTwo = groupBy(pays, ["currency"]);

    console.log(this.items)
  }

  private calculate(items: PayModel[]): void {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.cantIngresos = 0;
    this.cantEgresos = 0;
    try {
      items.forEach((item) => {
        if (item.idStateSolvency === "SOL") {
          this.totalIngresos += item.amount;
          this.cantIngresos++;
        }

        if (item.idStateSolvency === "PAY") {
          this.totalEgresos += item.amount;
          this.cantEgresos++;
        }
      });
    } catch (error) {
      console.error(error);
    }
    this.totalEarnings = this.totalIngresos + this.totalEgresos;
  }

  openModal(item: GroupModel<PayModel>): void {
    /* const amountAcum = this._amountPipe.transform(item.values, "amount");
    const amountAcumFormat = this._customDecimalPipe.transform(
      amountAcum,
      this.systemDecimal,
      this.numberOfDecimal
    );
    const title =
      this._translateService.instant("TITLES.TOTAL") + " " + amountAcumFormat;
    const data: ModalModel<GroupModel<PayModel>> = {
      type: "custom",
      item,
      title,
      currentUser: this.currentUser,
    };
    this._modalService
      .openModal(data)
      .then(() => {})
      .catch(() => {}); */
  }

  public chargeIndicatorManager(): void {
    const isLoadingPay$ = this._payFacadeService.getLoading$();

    const result$ = combineLatest([isLoadingPay$]).pipe(
      map(([isLoadingPay]) => isLoadingPay),
      takeUntil(this._finisher$)
    );

    result$.pipe(takeUntil(this._finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
