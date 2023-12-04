import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found-component.scss"],
})
export class NotFoundComponent {
  private _router = inject(Router);
  goBack() {
    this._router.navigate(["authenticated"]);
  }
}
