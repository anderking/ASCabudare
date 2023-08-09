import { Component, OnDestroy, OnInit } from "@angular/core";
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
  public isLoading: boolean;
  public items: ClientModel[] = [];
  public wordFilter = "";
  private _finisher = new Subject<void>();

  constructor(
    private _clientFacadeService: ClientFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _router: Router,
    private translateService: TranslateService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this._clientFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._clientFacadeService
      .getAll$()
      .pipe(
        filter((items: ClientModel[]) => !isNullOrUndefinedEmpty(items)),
        takeUntil(this._finisher)
      )
      .subscribe((items: ClientModel[]) => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
    this._finisher.next();
    this._sharedFacadeService.reset();
  }

  goDelete(item: ClientModel): void {
    this._clientFacadeService.delete(item);
  }

  goNew(): void {
    this._router.navigate(["/authenticated/configuration/client/form"]);
  }
  goEdit(item: ClientModel): void {
    this._router.navigate([
      "/authenticated/configuration/client/form",
      { id: item?.id },
    ]);
  }
  goBack(): void {
    this._location.back();
  }

  openModal(item: ClientModel) {
    const data: ModalModel<ClientModel> = {
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
