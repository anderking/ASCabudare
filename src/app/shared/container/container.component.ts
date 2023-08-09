import { Component, OnInit } from "@angular/core";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { ClientFacadeService } from "@facades/client-facade.service";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
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
    private authService: AuthService,
    private _sharedFacadeService: SharedFacadeService,
    private _ingresoEgresoFacadeService: IngresoEgresoFacadeService,
    private _categoryFacadeService: CategoryFacadeService,
    private _clientFacadeService: ClientFacadeService,
    private _combosFacadeService: CombosFacadeService
  ) {}

  ngOnInit(): void {
    this.authService.initAuthListener();
    this._sharedFacadeService.messageSubscriptions();
    this._ingresoEgresoFacadeService.search();
    this._categoryFacadeService.search();
    this._clientFacadeService.search();
    this._combosFacadeService.searchTypeActive();
    this._combosFacadeService.searchDocumentType();
  }
}
