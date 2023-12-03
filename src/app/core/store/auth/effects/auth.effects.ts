import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import {
  LoginFormModel,
  CurrentUserModel,
  UserAuthModel,
} from "@models/auth/current-user.model";
import * as actions from "@store/auth/actions/auth.actions";
import * as notificationActions from "@store/shared/actions/notification.actions";
import { FirebaseService } from "@services/firebase.service";
import { TranslateService } from "@ngx-translate/core";
import { parseCurrentUserAfterAuth } from "@root/core/utilities/core.utilities";

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _firebaseService: FirebaseService<
      LoginFormModel | CurrentUserModel
    >,
    private translateService: TranslateService
  ) {}

  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.login),
      switchMap(({ action }) =>
        this._firebaseService.signInWithEmailAndPassword$(action).pipe(
          map((userAuth: UserAuthModel) => {
            userAuth = parseCurrentUserAfterAuth(userAuth);
            return actions.loginSucess({ userAuth });
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  loginGoogle$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.loginGoogle),
      switchMap(() =>
        this._firebaseService.signInGoogle().pipe(
          map((userAuth: UserAuthModel) => {
            userAuth = parseCurrentUserAfterAuth(userAuth);
            return actions.loginGoogleSucess({ userAuth });
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  register$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.register),
      switchMap(({ action }) =>
        this._firebaseService.createUserWithEmailAndPassword$(action).pipe(
          map((userAuth: UserAuthModel) => {
            userAuth = parseCurrentUserAfterAuth(userAuth);
            return actions.registerSucess({ userAuth });
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  setUserDoc$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.setUserDoc),
      switchMap(({ action }) =>
        this._firebaseService.setUserDoc$(action).pipe(
          map((userDoc: CurrentUserModel) =>
            actions.setUserDocSuccess({ userDoc })
          ),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  updateProfile$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.updateProfile),
      switchMap(({ action }) =>
        this._firebaseService.setUserDoc$(action).pipe(
          switchMap((updateProfileFB: CurrentUserModel) => {
            const message = this.translateService.instant(
              "MESSAGES.USER_UPDATE_SUCCESS"
            );
            return [
              actions.updateProfileSuccess({ updateProfileFB }),
              notificationActions.setMessage({ message }),
            ];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  updateProfileFB$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.updateProfileFB),
      switchMap(({ action }) =>
        this._firebaseService.updateProfileFB$(action).pipe(
          switchMap((updateProfileFB: CurrentUserModel) => {
            return [actions.updateProfileFBSuccess({ updateProfileFB })];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  verifyEmail$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.verifyEmail),
      switchMap(() =>
        this._firebaseService.sendEmailVerification$().pipe(
          switchMap((message: string) => {
            return [
              actions.verifyEmailSuccess({ message }),
              notificationActions.setMessage({ message }),
            ];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  forgotPassword$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.forgotPassword),
      switchMap(({ action }) =>
        this._firebaseService.sendPasswordResetEmail$(action).pipe(
          switchMap((message: string) => {
            return [
              actions.forgotPasswordSuccess({ message }),
              notificationActions.setMessage({ message }),
            ];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });
}
