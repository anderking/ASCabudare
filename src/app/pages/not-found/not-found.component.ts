import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
})
export class NotFoundComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
