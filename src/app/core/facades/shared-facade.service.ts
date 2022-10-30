import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedInterface } from "@interfaces/shared-interface";
import { Store } from "@ngrx/store";
import * as selectors from "@store/shared/selectors/shared.selectors";
import * as actions from "@store/shared/actions/shared.actions";
import { ErrorModel } from "@models/shared/error.model";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { ToastService } from "@services/ui/toast.service";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SharedFacadeService implements SharedInterface {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store, private _toastService: ToastService) {}

  getMessage$(): Observable<string> {
    return this._store.select(selectors.selectMessage);
  }
  getError$(): Observable<ErrorModel> {
    return this._store.select(selectors.selectError);
  }
  getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }
  reset(): void {
    const action = actions.clear();
    this._store.dispatch(action);
  }
  messageSubscriptions(): void {
    this.getError$()
      .pipe(filter((error) => !isNullOrUndefinedEmpty(error)))
      .subscribe((error) => {
        console.error(error);
        let message:any;
        if (error.code){
          message = error.message;
        }else{
          message = error;
        }
        this._toastService.show(message, {
          classname: "bg-danger text-light",
          delay: 5000,
        });
        this.reset();
      });

    this.getMessage$()
      .pipe(filter((message) => !isNullOrUndefinedEmpty(message)))
      .subscribe((message) => {
        console.log(message);
        this._toastService.show(message, {
          classname: "bg-success text-light",
          delay: 5000,
        });
        this.reset();
      });
  }
}
