import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedInterface } from "@interfaces/shared-interface";
import { Store } from "@ngrx/store";
import * as selectors from "@store/shared/selectors/shared.selectors";
import * as actions from "@store/shared/actions/shared.actions";
import { ErrorModel } from "@models/shared/error.model";

@Injectable({
  providedIn: "root",
})
export class SharedFacadeService implements SharedInterface {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store) {}

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
}
