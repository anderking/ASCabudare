import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginFormModel, CurrentUserModel } from "@models/auth/current-user.model";
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

  public getLogin$(): Observable<CurrentUserModel> {
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

  public getRegister$(): Observable<CurrentUserModel> {
    return this._store.select(selectors.selectRegister);
  }

  public setUserDoc(payload: CurrentUserModel): void {
    const action: DataActionModel<CurrentUserModel> = {
      url: `${payload.uid}/${collectionFBUser}`,
      payload,
    };

    const props = actions.setUserDoc({
      action,
    });
    this._store.dispatch(props);
  }

  public getUserDoc$(): Observable<CurrentUserModel> {
    return this._store.select(selectors.selectUserDoc);
  }

  public updateProfile(payload: CurrentUserModel): void {
    const action: DataActionModel<CurrentUserModel> = {
      url: `${payload.uid}/${collectionFBUser}`,
      payload,
    };

    const props = actions.updateProfile({
      action,
    });
    this._store.dispatch(props);
  }

  public getUpdateProfileLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectUpdateProfile);
  }

  public updateProfileFB(payload: CurrentUserModel): void {
    const action: DataActionModel<CurrentUserModel> = {
      url: `${payload.uid}/${collectionFBUser}`,
      payload,
    };

    const props = actions.updateProfileFB({
      action,
    });
    this._store.dispatch(props);
  }

  public getUpdateProfileFBLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectUpdateProfileFB);
  }

  public setCurrentUser(currentUser: CurrentUserModel): void {
    const props = actions.setCurrentUser({ currentUser });
    this._store.dispatch(props);
  }

  public getCurrentUser$(): Observable<CurrentUserModel> {
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
