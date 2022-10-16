import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginFormModel, LoginResponseModel } from "@models/auth/login.model";
import { DataActionModel } from "@models/common/data-action.model";
import { Store } from "@ngrx/store";
import * as selectors from "@store/auth/selectors/auth.selectors";
import * as actions from "@store/auth/actions/auth.actions";
import { collectionFBUser } from "../constants/auth/auth.constants";

@Injectable({
  providedIn: "root",
})
export class AuthFacadeService {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store) {}

  public login(payload: LoginFormModel): void {
    const action: DataActionModel<LoginFormModel> = {
      url: collectionFBUser,
      payload,
    };

    const props = actions.login({
      action,
    });
    this._store.dispatch(props);
  }

  public getLogin$(): Observable<LoginResponseModel> {
    return this._store.select(selectors.selectLogin);
  }

  public register(payload: LoginFormModel): void {
    const action: DataActionModel<LoginFormModel> = {
      url: collectionFBUser,
      payload,
    };

    const props = actions.register({
      action,
    });
    this._store.dispatch(props);
  }

  public getRegister$(): Observable<LoginResponseModel> {
    return this._store.select(selectors.selectRegister);
  }

  public setUserDoc(payload: LoginResponseModel): void {
    const action: DataActionModel<LoginResponseModel> = {
      url: `${payload.uid}/${collectionFBUser}`,
      payload,
    };

    const props = actions.setUserDoc({
      action,
    });
    this._store.dispatch(props);
  }

  public getUserDoc$(): Observable<LoginResponseModel> {
    return this._store.select(selectors.selectUserDoc);
  }

  public updateProfile(payload: LoginResponseModel): void {
    const action: DataActionModel<LoginResponseModel> = {
      url: `${payload.uid}/${collectionFBUser}`,
      payload,
    };

    const props = actions.updateProfile({
      action,
    });
    this._store.dispatch(props);
  }

  public setCurrentUser(currentUser: LoginResponseModel): void {
    const props = actions.setCurrentUser({ currentUser });
    this._store.dispatch(props);
  }

  public getCurrentUser$(): Observable<LoginResponseModel> {
    return this._store.select(selectors.selectCurrentUser);
  }

  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }

  public reset(): void {
    const action = actions.clear();
    this._store.dispatch(action);
  }
}
