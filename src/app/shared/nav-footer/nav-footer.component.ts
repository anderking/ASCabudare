import { Component, OnInit, inject } from "@angular/core";
import { AuthFacadeService } from "@facades/auth-facade.service";
import {
  faGauge,
  faTags,
  faUsers,
  faMoneyBillTransfer,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
  faMoon,
  faLanguage,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthService } from "@services/auth/auth.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-nav-footer",
  templateUrl: "./nav-footer.component.html",
  styleUrls: ["./nav-footer.component.scss"],
})
export class NavFooterComponent implements OnInit {
  private _authService = inject(AuthService);
  private _authFacadeService = inject(AuthFacadeService);

  public user: CurrentUserModel;
  public lang: boolean;
  public langStorage = localStorage.getItem("lang");
  public darkMode: boolean;
  public darkModeStorage = localStorage.getItem("dark-mode");
  public finisher$ = new Subject<void>();
  public faGauge = faGauge;
  public faTags = faTags;
  public faUsers = faUsers;
  public faMoneyBillTransfer = faMoneyBillTransfer;
  public faMoneyBill = faMoneyBill;
  public faGear = faGear;
  public faRightFromBracket = faRightFromBracket;
  public faBars = faBars;
  public faXmark = faXmark;
  public faMoon = faMoon;
  public faLanguage = faLanguage;

  ngOnInit() {
    this._authFacadeService
      .getCurrentUser$()
      .pipe(takeUntil(this.finisher$))
      .subscribe((user: CurrentUserModel) => {
        this.user = user;
      });
  }

  public logout(): void {
    this._authService.logout();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/auth");
  }
}
