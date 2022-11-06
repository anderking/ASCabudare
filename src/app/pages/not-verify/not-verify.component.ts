import { Component, OnInit } from "@angular/core";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { AuthService } from "@services/auth/auth.service";
@Component({
  selector: "app-not-verify",
  templateUrl: "./not-verify.component.html",
  styleUrls: ["./not-verify.component.scss"],
})
export class NotVerifyComponent implements OnInit {
  public isLoading: boolean;
  constructor(
    private auth: AuthService,
    private _authFacadeService: AuthFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

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
    this.auth.logut();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute);
  }
}
