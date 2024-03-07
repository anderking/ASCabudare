import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { FacadeInterface } from "@interfaces/facade-interface";
import { DataActionModel } from "@models/common/data-action.model";
import { PayModel } from "@models/management/pay.model";
import * as selectors from "@store/management/selectors/pay.selectors";
import * as actions from "@store/management/actions/pay.actions";
import { collectionFB } from "@constants/management/pay.constants";
import { AttachmentModel } from "@models/shared/attachment.model";
import { CurrentFilterModel } from "@models/shared/filter.model";

@Injectable({
  providedIn: "root",
})
export class PayFacadeService implements FacadeInterface<PayModel> {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store) {}

  /**
   * Dispara la acción para buscar todos los registros sin filtro en la api
   */
  public search(): void {
    const props: DataActionModel<PayModel> = {
      url: collectionFB,
    };
    const action = actions.searchApi({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene todos los registros del store disparados por los diferentes search
   */
  public getAll$(): Observable<PayModel[]> {
    return this._store.select(selectors.selectAll);
  }

  /**
   * Dispara la acción para buscar un solo registro en la api
   */
  public searchOne(id: string): void {
    const props: DataActionModel<PayModel> = {
      url: collectionFB,
      id,
    };
    const action = actions.searchOneApi({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene del store el registro disparado por el searchOne
   */
  public getOne$(): Observable<PayModel> {
    return this._store.select(selectors.selectCurrent);
  }

  /**
   * Dispara la acción para crear un registro
   * @param payload Contiene el body de la petición
   */
  public create(payload: PayModel, currentFile?: AttachmentModel): void {
    const props: DataActionModel<PayModel> = {
      url: collectionFB,
      payload,
      currentFile
    };

    const action = actions.createApi({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para actualizar un registro
   * @param payload Contiene el body de la petición
   */
  public update(payload: PayModel): void {
    const props: DataActionModel<PayModel> = {
      url: collectionFB,
      payload,
    };

    const action = actions.updateApi({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para borrar un registro
   * @param payload Contiene el body de la petición
   */
  public delete(payload: PayModel): void {
    const props: DataActionModel<PayModel> = {
      url: collectionFB,
      payload,
    };

    const action = actions.deleteApi({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para seleccionar un registro de la tabla
   * @param payload Contiene el body de la petición
   */
  public select(payload: PayModel): void {
    if (payload) {
      const action = actions.setCurrentItemId({
        id: payload.id,
      });
      this._store.dispatch(action);
    }
  }

  /**
   * Obtiene del store el item actual tras disparar el select
   */
  public getCurrentItem$(): Observable<PayModel> {
    return this._store.select(selectors.selectCurrent);
  }

  /**
   * Dispara la acción para resetear el currentItem
   */
  public resetSelected(): void {
    const action = actions.resetSelected();
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para vaciar el store
   */
  public reset(): void {
    const action = actions.reset();
    this._store.dispatch(action);
  }

  /**
   * Obtiene el loading para manipular el spinner
   */
  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }

  getCurrentFilter$(): Observable<CurrentFilterModel> {
    return this._store.select(selectors.selectCurrentFilter);
  }
  setCurrentFilter(currentFilter: CurrentFilterModel): void {
    const action = actions.setCurrentFilter({ currentFilter });
    this._store.dispatch(action);
  }
}
