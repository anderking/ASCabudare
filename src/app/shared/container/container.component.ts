import { Component, OnInit, inject } from "@angular/core";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { PayFacadeService } from "@facades/pay-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  private _authService = inject(AuthService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _combosFacadeService = inject(CombosFacadeService);
  private _payFacadeService = inject(PayFacadeService);

  public sidebarExpanded = true;

  ngOnInit(): void {
    this._authService.initAuthListener();
    this._sharedFacadeService.messageSubscriptions();
    this._combosFacadeService.searchDocumentType();
    this._combosFacadeService.searchStateSolvency();
    this._combosFacadeService.searchCurrency();
    this._combosFacadeService.searchPayType();
    this._payFacadeService.search();
  }
}
