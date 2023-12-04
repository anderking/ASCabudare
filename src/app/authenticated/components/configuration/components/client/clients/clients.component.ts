import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { filter, takeUntil } from "rxjs/operators";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ClientModel } from "@models/configurations/client.model";
import { ClientFacadeService } from "@facades/client-facade.service";
import { ModalService } from "@services/ui/modal.service";
import { TranslateService } from "@ngx-translate/core";
import { ModalModel } from "@models/shared/modal.model";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
})
export class ClientsComponent implements OnInit, OnDestroy {
  private _clientFacadeService = inject(ClientFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _translateService = inject(TranslateService);
  private _modalService = inject(ModalService);
  private _router = inject(Router);
  private _location = inject(Location);
  private _finisher$ = new Subject<void>();

  public isLoading: boolean;
  public items: ClientModel[] = [];
  public wordFilter = "";
  public wordFilterActive = false;

  ngOnInit() {
    this._clientFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._clientFacadeService
      .getAll$()
      .pipe(
        filter((items: ClientModel[]) => !isNullOrUndefinedEmpty(items)),
        takeUntil(this._finisher$)
      )
      .subscribe((items: ClientModel[]) => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
    this._finisher$.next();
    this._sharedFacadeService.reset();
  }

  wordFilterReceived(wordFilter: string): void {
    this.wordFilter = wordFilter;
  }

  goNew(): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate(["/authenticated/configuration/client/form"]);
    }, 0);
  }

  goEdit(item: ClientModel): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/configuration/client/form",
        { id: item?.id },
      ]);
    }, 0);
  }

  goShow(item: ClientModel): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/configuration/client/show",
        { id: item?.id },
      ]);
    }, 0);
  }

  goDelete(item: ClientModel): void {
    this._clientFacadeService.delete(item);
  }

  goBack(): void {
    this._location.back();
  }

  openModal(item: ClientModel) {
    const data: ModalModel<ClientModel> = {
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
