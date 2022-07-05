import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedInterface } from "@interfaces/shared-interface";
import { Store } from "@ngrx/store";
import { SharedState } from "@store/shared";
import * as selectors from "@store/shared/selectors/shared.selectors";
import * as actions from "@store/shared/actions/shared.actions";

/**
 * Definición de la clase principal y sus implementaciones
 * @class SustainingSupportParametrizationFacadeService
 */
@Injectable({
  providedIn: "root",
})
export class SharedFacadeService implements SharedInterface {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store
   */
  constructor(private _store: Store<SharedState>) {}

  getMessages$(): Observable<string> {
    return this._store.select(selectors.selectMessage);
  }
  getError$(): Observable<string | null> {
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
