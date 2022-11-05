import { Component, OnInit } from "@angular/core";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

  ngOnInit(): void {
    this.authService.initAuthListener();
    this._sharedFacadeService.messageSubscriptions();
  }
}
