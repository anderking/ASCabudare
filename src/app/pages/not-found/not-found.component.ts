import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {

  constructor(private _location: Location) { }
  goBack(){
    this._location.back();
  }

}
