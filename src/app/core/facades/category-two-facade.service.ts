import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { FacadeInterface } from "@interfaces/facade-interface";
import { DataActionModel } from "@models/common/data-action.model";
import { CategoryModel } from "@models/configurations/category.model";
import * as selectors from "@store/configuration/selectors/category.selectors";
import * as actions from "@store/configuration/actions/category.actions";

@Injectable({
  providedIn: "root",
})
export class CategoryTwoFacadeService
  implements FacadeInterface<CategoryModel>
{
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store) {}

  /**
   * Dispara la acción para buscar todos los registros sin filtro en la api
   */
  public search(): void {
    const props: DataActionModel<CategoryModel> = {
      url: "Category/GetAll",
    };
    const action = actions.searchApi({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene todos los registros del store disparados por los diferentes search
   */
  public getAll$(): Observable<CategoryModel[]> {
    return this._store.select(selectors.selectAll);
  }

  /**
   * Dispara la acción para buscar un solo registro en la api
   */
  public searchOne(id: string): void {
    const props: DataActionModel<CategoryModel> = {
      url: "Category/GetById/" + id,
    };
    const action = actions.searchOneApi({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene del store el registro disparado por el searchOne
   */
  public getOne$(): Observable<CategoryModel> {
    return this._store.select(selectors.selectCurrent);
  }

  /**
   * Dispara la acción para crear un registro
   * @param payload Contiene el body de la petición
   */
  public create(payload: CategoryModel): void {
    const props: DataActionModel<CategoryModel> = {
      url: "Category/Create",
      payload,
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
  public update(payload: CategoryModel): void {
    const props: DataActionModel<CategoryModel> = {
      url: "Category/Update/" + payload.id,
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
  public delete(payload: CategoryModel): void {
    const props: DataActionModel<CategoryModel> = {
      url: "Category/Delete/" + payload.id,
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
  public select(payload: CategoryModel): void {
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
  public getCurrentItem$(): Observable<CategoryModel> {
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
}
