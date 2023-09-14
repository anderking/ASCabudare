import { Component, OnInit } from "@angular/core";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { ClientFacadeService } from "@facades/client-facade.service";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { LendingFacadeService } from "@facades/lending-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  sidebarExpanded = true;
  constructor(
    private _authService: AuthService,
    private _sharedFacadeService: SharedFacadeService,
    private _combosFacadeService: CombosFacadeService,
    private _categoryFacadeService: CategoryFacadeService,
    private _clientFacadeService: ClientFacadeService,
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _lendingFacadeService: LendingFacadeService
  ) {}

  ngOnInit(): void {
    this._authService.initAuthListener();
    this._sharedFacadeService.messageSubscriptions();
    this._combosFacadeService.searchTypeActive();
    this._combosFacadeService.searchDocumentType();
    this._combosFacadeService.searchStateSolvency();
    this._categoryFacadeService.search();
    this._clientFacadeService.search();
    this._ingresoEgresoFacadeService.search();
    this._lendingFacadeService.search();
  }
}
