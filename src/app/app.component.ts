import { Component, OnInit } from "@angular/core";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { filter, takeUntil } from "rxjs/operators";
import Swal from "sweetalert2";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private _sharedFacadeService: SharedFacadeService) {}

  ngOnInit() {
    this.messageSubscriptions();
  }

  /**
   * Se manejan las sucripciones de mensajes que se requieren mantener abiertas durante la gestion del componente
   */
  private messageSubscriptions(): void {
    this._sharedFacadeService
      .getError$()
      .pipe(filter((error) => !isNullOrUndefined(error)))
      .subscribe((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: error.code,
          text: error.message,
        });
        this._sharedFacadeService.reset();
      });

    this._sharedFacadeService
      .getMessage$()
      .pipe(filter((message) => message !== null))
      .subscribe((message) => {
        console.log(message);
        Swal.fire({
          icon: "success",
          title: "Excelente!",
          text: message,
        });
        this._sharedFacadeService.reset();
      });
  }
}
