import { Component, OnInit, inject } from "@angular/core";
import { SharedFacadeService } from "@facades/shared-facade.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  private _sharedFacadeService = inject(SharedFacadeService);

  ngOnInit(): void {
    this._sharedFacadeService.messageSubscriptions();
  }
}
