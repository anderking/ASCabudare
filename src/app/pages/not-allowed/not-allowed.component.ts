import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-not-allowed",
  templateUrl: "./not-allowed.component.html",
  styleUrls: ["./not-allowed.component.scss"],
})
export class NotAllowedComponent {
  private _router = inject(Router);
  goBack() {
    this._router.navigate(["authenticated"]);
  }
}
