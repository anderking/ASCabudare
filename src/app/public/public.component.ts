import { Component, OnInit, inject } from "@angular/core";
import { SharedFacadeService } from "@facades/shared-facade.service";

@Component({
  selector: "app-public",
  templateUrl: "./public.component.html",
})
export class PublicComponent implements OnInit {
  private _sharedFacadeService = inject(SharedFacadeService);

  ngOnInit(): void {
    this._sharedFacadeService.messageSubscriptions();
  }
}
