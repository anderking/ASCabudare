import { Component, OnInit } from "@angular/core";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-authenticated",
  templateUrl: "./authenticated.component.html",
  styleUrls: ["./authenticated.component.scss"],
})
export class AuthenticatedComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

  ngOnInit(): void {
    this.authService.initAuthListener();
    this._sharedFacadeService.messageSubscriptions();
  }
}
