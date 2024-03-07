import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { filter, map, takeUntil } from "rxjs/operators";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject, combineLatest } from "rxjs";
import { Location } from "@angular/common";
import { PayFacadeService } from "@facades/pay-facade.service";
import { PayModel } from "@models/management/pay.model";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";

@Component({
  selector: "app-pay-show",
  templateUrl: "./pay-show.component.html",
})
export class PayShowComponent implements OnInit, OnDestroy {
  @Input() id?: string;

  private _payFacadeService = inject(PayFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _location = inject(Location);
  private finisher$ = new Subject<void>();

  public isLoading: boolean;
  public currentItem: PayModel = null;

  public currentUser: CurrentUserModel;
  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  ngOnInit() {
    this.chargeIndicatorManager();

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

    const pays$ = this._payFacadeService.getAll$().pipe(
      filter((items: PayModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this.finisher$)
    );

    const results$ = combineLatest([pays$]);

    results$
      .pipe(
        map(([pays]) => {
          try {
            const pay = pays.find((item: PayModel) => item.id === this.id);
            return {
              pay,
            };
          } catch (error) {
            return {
              item: null,
              items: [],
            };
          }
        }),
        takeUntil(this.finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        this.currentItem = data.pay;
      });
  }

  ngOnDestroy(): void {
    this.finisher$.next();
    this._sharedFacadeService.reset();
  }

  goBack(): void {
    this._location.back();
  }

  chargeIndicatorManager(): void {
    const isLoadingPay$ = this._payFacadeService.getLoading$();

    const result$ = combineLatest([isLoadingPay$]).pipe(
      map(([isLoadingPay]) => isLoadingPay),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
