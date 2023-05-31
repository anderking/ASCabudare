import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { DataActionModel } from "@models/common/data-action.model";
import * as selectors from "@store/masters/selectors/combo.selectors";
import * as actions from "@store/masters/actions/combo.actions";
import { ComboModel } from "@models/masters/combo.model";
import { collectionFBTypeActive } from "../constants/masters/masters.constants";

@Injectable({
  providedIn: "root",
})
export class CombosFacadeService {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store) {}

  /**
   * Dispara la acción para buscar todos los registros sin filtro en la api
   */
  public searchTypeActive(): void {
    const props: DataActionModel<ComboModel> = {
      url: collectionFBTypeActive,
    };
    const action = actions.searchTypeActive({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene todos los registros del store disparados por los diferentes search
   */
  public getTypeActive$(): Observable<ComboModel[]> {
    return this._store.select(selectors.selectTypeActive);
  }

  /**
   * Obtiene el loading para manipular el spinner
   */
  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }

  /**
   * Dispara la acción para vaciar el store
   */
  public reset(): void {
    const action = actions.clearCombos();
    this._store.dispatch(action);
  }
}
