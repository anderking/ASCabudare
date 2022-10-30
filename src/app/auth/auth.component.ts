import { Component, OnInit } from "@angular/core";
import { SharedFacadeService } from "@facades/shared-facade.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  constructor(private _sharedFacadeService: SharedFacadeService) {}

  ngOnInit(): void {
    this._sharedFacadeService.messageSubscriptions();
  }
}
