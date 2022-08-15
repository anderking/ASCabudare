import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { FacadeInterface } from "@interfaces/facade-interface";
import { DataActionModel } from "@models/common/data-action.model";
import { IngresoEgresoModel } from "@models/ingreso-egreso.model";
import * as selectors from "@store/ingreso-egreso/selectors/ingreso-egreso.selectors";
import * as actions from "@store/ingreso-egreso/actions/ingreso-egreso.actions";
import {
  collectionFB,
  collectionFBSecond,
} from "../constants/ingreso-egreso/ingreso-egreso.constants";
import { AuthFacadeService } from "./auth-facade.service";
import { LoginResponseModel } from "@models/auth/login.model";
import { getCurrentUserDecrypt } from "../utilities/core.utilities";
/**
 * Definición de la clase principal y sus implementaciones
 * @class IngresoEgresoFacadeService
 */
@Injectable({
  providedIn: "root",
})
export class IngresoEgresoFacadeService
  implements FacadeInterface<IngresoEgresoModel>
{
  private currentUser: LoginResponseModel = getCurrentUserDecrypt();
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store
   */
  constructor(private _store: Store) {}

  /**
   * Dispara la acción para buscar todos los registros sin filtro en la api
   */
  public search(): void {
    const props: DataActionModel<IngresoEgresoModel> = {
      url: this.currentUser.uid + "/" + collectionFB + "/" + collectionFBSecond,
    };
    const action = actions.searchApiIngresoEgresos({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene todos los registros del store disparados por los diferentes search
   */
  public getAll$(): Observable<IngresoEgresoModel[]> {
    return this._store.select(selectors.selectAll);
  }

  /**
   * Dispara la acción para buscar un solo registro en la api
   */
  public searchOne(id: string): void {
    const props: DataActionModel<IngresoEgresoModel> = {
      url: collectionFB + "/" + id,
    };
    const action = actions.searchOneApiIngresoEgreso({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene del store el registro disparado por el searchOne
   */
  public getOne$(): Observable<IngresoEgresoModel> {
    return this._store.select(selectors.selectCurrent);
  }

  /**
   * Dispara la acción para seleccionar un registro de la tabla
   * @param payload
   */
  public select(payload: IngresoEgresoModel): void {
    if (payload) {
      const action = actions.setCurrentIngresoEgresoId({
        id: payload.id,
      });
      this._store.dispatch(action);
    }
  }

  /**
   * Obtiene del store el item actual tras disparar el select
   */
  public getCurrentItem$(): Observable<IngresoEgresoModel> {
    return this._store.select(selectors.selectCurrent);
  }

  /**
   * Dispara la acción para crear un registro
   * @param payload
   */
  public create(payload: IngresoEgresoModel): void {
    const props: DataActionModel<IngresoEgresoModel> = {
      url: this.currentUser.uid + "/" + collectionFB + "/" + collectionFBSecond,
      payload: payload,
    };

    const action = actions.createApiIngresoEgreso({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para crear un registro
   * @param payload
   */
  public createSecond(payload: IngresoEgresoModel): void {
    const props: DataActionModel<IngresoEgresoModel> = {
      url: this.currentUser.uid + "/" + collectionFB,
      collection: "Items",
      payload: payload,
    };

    const action = actions.createApiIngresoEgresoSecond({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para actualizar un registro
   * @param payload
   */
  public update(payload: IngresoEgresoModel): void {
    const props: DataActionModel<IngresoEgresoModel> = {
      url: collectionFB,
      payload: payload,
    };

    const action = actions.updateApiIngresoEgreso({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para borrar un registro
   * @param payload
   */
  public delete(payload: IngresoEgresoModel): void {
    const props: DataActionModel<IngresoEgresoModel> = {
      url: collectionFB,
      payload: payload,
    };

    const action = actions.deleteApiIngresoEgreso({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para resetear el currentItem
   */
  public resetSelected(): void {
    const action = actions.clearCurrentIngresoEgreso();
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para vaciar el store
   * @param items
   */
  public reset(): void {
    const action = actions.clearIngresoEgresos();
    this._store.dispatch(action);
  }

  /**
   * Obtiene el loading para manipular el spinner
   */
  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }
}
