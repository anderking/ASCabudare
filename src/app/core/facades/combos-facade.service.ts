import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { DataActionModel } from "@models/common/data-action.model";
import * as selectors from "@store/masters/selectors/combo.selectors";
import * as actions from "@store/masters/actions/combo.actions";
import { ComboModel } from "@models/masters/combo.model";
import {
  collectionFBDocumentType,
  collectionFBTypeActive,
  collectionFBStateSolvency,
} from "@constants/masters/masters.constants";

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
   * Dispara la acción para buscar todos los registros sin filtro en la api
   */
  public searchDocumentType(): void {
    const props: DataActionModel<ComboModel> = {
      url: collectionFBDocumentType,
    };
    const action = actions.searchDocumentType({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene todos los registros del store disparados por los diferentes search
   */
  public getDocumentType$(): Observable<ComboModel[]> {
    return this._store.select(selectors.selectDocumentType);
  }

  /**
   * Dispara la acción para buscar todos los registros sin filtro en la api
   */
  public searchStateSolvency(): void {
    const props: DataActionModel<ComboModel> = {
      url: collectionFBStateSolvency,
    };
    const action = actions.searchStateSolvency({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene todos los registros del store disparados por los diferentes search
   */
  public getStateSolvency$(): Observable<ComboModel[]> {
    return this._store.select(selectors.selectStateSolvency);
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
    const action = actions.resetCombos();
    this._store.dispatch(action);
  }
}
