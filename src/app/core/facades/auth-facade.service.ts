import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel } from "@models/auth/login.model";
import { DataActionModel } from "@models/common/data-action.model";
import { Store } from "@ngrx/store";
import { AuthState } from "@store/auth";
import * as selectors from "@store/auth/selectors/auth.selectors";
import * as actions from "@store/auth/actions/auth.actions";
import { UserModel } from "@models/auth/user.model";
/**
 * Definición de la clase principal y sus implementaciones
 * @class SustainingSupportParametrizationFacadeService
 */
@Injectable({
  providedIn: "root",
})
export class AuthFacadeService {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store
   */
  constructor(private _store: Store<AuthState>) {}

  public login(payload: LoginModel): void {
    const action: DataActionModel<LoginModel> = {
      url: "user",
      payload: payload,
    };

    const props = actions.register({
      action,
    });
    this._store.dispatch(props);
  }

  getLogin$(): Observable<LoginModel> {
    return this._store.select(selectors.selectLogin);
  }

  public register(payload: LoginModel): void {
    const action: DataActionModel<LoginModel> = {
      url: "user",
      payload: payload,
    };

    const props = actions.register({
      action,
    });
    this._store.dispatch(props);
  }

  getRegister$(): Observable<LoginModel> {
    return this._store.select(selectors.selectRegister);
  }

  getUser$(): Observable<UserModel> {
    return this._store.select(selectors.selectUser);
  }

  getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }

  reset(): void {
    const action = actions.clear();
    this._store.dispatch(action);
  }
}
