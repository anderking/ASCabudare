import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { LendingModel } from "@models/management/lending.model";
import { LendingFacadeService } from "@facades/lending-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject, combineLatest } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { RangeDate } from "@models/shared/filter.model";
import { ModalModel } from "@models/shared/modal.model";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "@services/ui/modal.service";
import { ClientFacadeService } from "@facades/client-facade.service";
import { ClientModel } from "@models/configurations/client.model";
import { groupBy } from "@root/core/utilities/core.utilities";
import { GroupModel } from "@models/shared/group.model";

@Component({
  selector: "app-client-show",
  templateUrl: "./client-show.component.html",
})
export class ClientShowComponent implements OnInit, OnDestroy {
  @Input() id?: string;

  private _lendingFacadeService = inject(LendingFacadeService);
  private _clientFacadeService = inject(ClientFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _authFacadeService = inject(AuthFacadeService);
  private _translateService = inject(TranslateService);
  private _modalService = inject(ModalService);
  private _location = inject(Location);
  private _router = inject(Router);
  private finisher$ = new Subject<void>();

  public isLoading: boolean;
  public items: LendingModel[] = [];
  public itemsGroup: GroupModel<LendingModel>[] = [];
  public currentItem: ClientModel = null;
  public wordFilter = "";
  public wordFilterActive = false;
  public currentUser: CurrentUserModel;
  public rangeDate: RangeDate;
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

    const clients$ = this._clientFacadeService.getAll$().pipe(
      filter((items: ClientModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this.finisher$)
    );

    const lendings$ = this._lendingFacadeService.getAll$().pipe(
      filter((items: LendingModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this.finisher$)
    );

    const results$ = combineLatest([clients$, lendings$]);

    results$
      .pipe(
        map(([clients, lendings]) => {
          try {
            const client = clients.find(
              (item: ClientModel) => item.id === this.id
            );
            const items = lendings.filter(
              (item: LendingModel) => item.idClient == client.id
            );
            return {
              client,
              items,
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
        this.currentItem = data.client;
        this.items = data.items;
        this.itemsGroup = groupBy(data.items, ["typeActive"]);
      });
  }

  ngOnDestroy(): void {
    this.finisher$.next();
    this._sharedFacadeService.reset();
  }

  wordFilterReceived(wordFilter: string): void {
    this.wordFilter = wordFilter;
  }

  goBack(): void {
    this._location.back();
  }

  goNew(): void {
    this.wordFilterActive = true;
    this._router.navigate([
      "/authenticated/management/lending/form",
      { idClient: this.currentItem?.id },
    ]);
  }

  goEdit(item: LendingModel): void {
    this.wordFilterActive = true;
    this._router.navigate([
      "/authenticated/management/lending/form",
      { id: item?.id, idClient: this.currentItem?.id },
    ]);
  }

  goDelete(item: LendingModel): void {
    this._lendingFacadeService.delete(item);
  }

  openModal(item: LendingModel): void {
    const data: ModalModel<LendingModel> = {
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

  chargeIndicatorManager(): void {
    const isLoadingClient$ = this._clientFacadeService.getLoading$();
    const isLoadingLending$ = this._lendingFacadeService.getLoading$();

    const result$ = combineLatest([isLoadingClient$, isLoadingLending$]).pipe(
      map(
        ([isLoadingClient, isLoadingLending]) =>
          isLoadingClient || isLoadingLending
      ),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
