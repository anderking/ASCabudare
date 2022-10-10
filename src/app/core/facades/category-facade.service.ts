import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { FacadeInterface } from "@interfaces/facade-interface";
import { DataActionModel } from "@models/common/data-action.model";
import { CategoryModel } from "@models/configurations/category.model";
import * as selectors from "@store/configuration/selectors/category.selectors";
import * as actions from "@store/configuration/actions/category.actions";
import {
  collectionFB,
  collectionFBSecond,
} from "../constants/configurations/category.constants";
import { LoginResponseModel } from "@models/auth/login.model";
import { getCurrentUserDecrypt } from "../utilities/core.utilities";

@Injectable({
  providedIn: "root",
})
export class CategoryFacadeService implements FacadeInterface<CategoryModel> {
  private currentUser: LoginResponseModel = getCurrentUserDecrypt();
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
      url: this.currentUser.uid + "/" + collectionFB + "/" + collectionFBSecond,
    };
    const action = actions.searchApiCategorys({ props });
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
  public searchOne(item: any): void {
    const props: DataActionModel<CategoryModel> = {
      url: this.currentUser.uid + "/" + collectionFB + "/" + collectionFBSecond,
      payload: item,
    };
    const action = actions.searchOneApiCategory({ props });
    this._store.dispatch(action);
  }

  /**
   * Obtiene del store el registro disparado por el searchOne
   */
  public getOne$(): Observable<CategoryModel> {
    return this._store.select(selectors.selectCurrent);
  }

  /**
   * Dispara la acción para seleccionar un registro de la tabla
   * @param payload Contiene el body de la petición
   */
  public select(payload: CategoryModel): void {
    if (payload) {
      const action = actions.setCurrentCategoryId({
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
   * Dispara la acción para crear un registro
   * @param payload Contiene el body de la petición
   */
  public create(payload: CategoryModel): void {
    const props: DataActionModel<CategoryModel> = {
      url: this.currentUser.uid + "/" + collectionFB + "/" + collectionFBSecond,
      payload,
    };

    const action = actions.createApiCategory({
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
      url: this.currentUser.uid + "/" + collectionFB + "/" + collectionFBSecond,
      payload,
    };

    const action = actions.updateApiCategory({
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
      url: this.currentUser.uid + "/" + collectionFB + "/" + collectionFBSecond,
      payload,
    };

    const action = actions.deleteApiCategory({
      props,
    });
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para resetear el currentItem
   */
  public resetSelected(): void {
    const action = actions.clearCurrentCategory();
    this._store.dispatch(action);
  }

  /**
   * Dispara la acción para vaciar el store
   */
  public reset(): void {
    const action = actions.clearCategorys();
    this._store.dispatch(action);
  }

  /**
   * Obtiene el loading para manipular el spinner
   */
  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }
}
