import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as selectors from "@store/shared/selectors/shared.selectors";
import * as actions from "@store/shared/actions/attachment.actions";
import { DataActionModel } from "@models/common/data-action.model";
import { AttachmentModel } from "@models/shared/attachment.model";

@Injectable({
  providedIn: "root",
})
export class AttachmentFacadeService {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store) {}

  /**
   * Dispara la acción para crear un registro
   * @param payload Contiene el body de la petición
   */
  public create(payload: AttachmentModel): void {
    const props: DataActionModel<AttachmentModel> = {
      url: "",
      payload,
    };

    const action = actions.createAttachment({
      props,
    });
    this._store.dispatch(action);
  }

  public getUrlAttachment$(): Observable<string> {
    return this._store.select(selectors.selectUrlAttachment);
  }

  /**
   * Obtiene el loading para manipular el spinner
   */
  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }

  /**
   * Limpia el reducer
   */
  public reset(): void {
    const action = actions.clear();
    this._store.dispatch(action);
  }
}
