import { Component, OnInit, inject } from "@angular/core";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { AuthService } from "@services/auth/auth.service";
@Component({
  selector: "app-not-verify",
  templateUrl: "./not-verify.component.html",
  styleUrls: ["./not-verify.component.scss"],
})
export class NotVerifyComponent implements OnInit {
  private _authService = inject(AuthService);
  private _authFacadeService = inject(AuthFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);

  public isLoading: boolean;

  ngOnInit(): void {
    this._sharedFacadeService.messageSubscriptions();
    this._authFacadeService.getLoading$().subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
  public verifyEmail(): void {
    this._authFacadeService.verifyEmail();
  }
  public logout(): void {
    this._authService.logout();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute);
  }
}
