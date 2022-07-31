import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { DataActionModel } from "@models/common/data-action.model";
import * as selectors from "@store/masters/selectors/combo.selectors";
import * as actions from "@store/masters/actions/combo.actions";

import { ComboModel } from "@models/masters/combo.model";
import { collectionFBCategory, collectionFBTypeActive } from "../constants/masters/masters.constants";
/**
 * Definición de la clase principal y sus implementaciones
 * @class CombosFacadeService
 */
@Injectable({
  providedIn: "root",
})
export class CombosFacadeService {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store
   */
  constructor(private _store: Store) {}

  /**
   * Dispara la acción para buscar todos los registros sin filtro en la api
   */
  public searchCategory(): void {
    const props: DataActionModel<ComboModel> = {
      url: collectionFBCategory,
    };
    const action = actions.searchCategory({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene todos los registros del store disparados por los diferentes search
   */
  public getCategory$(): Observable<ComboModel[]> {
    return this._store.select(selectors.selectCategory);
  }

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
   * Dispara la acción para vaciar el store
   * @param items
   */
  public reset(): void {
    const action = actions.clearCombos();
    this._store.dispatch(action);
  }

  /**
   * Obtiene el loading para manipular el spinner
   */
  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }
}
