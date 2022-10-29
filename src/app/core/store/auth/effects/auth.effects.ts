import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { LoginFormModel, LoginResponseModel } from "@models/auth/login.model";
import * as actions from "../actions/auth.actions";
import { sharedActions } from "@store/shared/actions";
import { FirebaseService } from "@services/firebase.service";

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _firebaseService: FirebaseService<
      LoginFormModel | LoginResponseModel
    >
  ) {}

  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.login),
      switchMap(({ action }) =>
        this._firebaseService.signInWithEmailAndPassword$(action).pipe(
          map((login: any) => {
            const user: LoginResponseModel = {
              displayName: login.displayName,
              email: login.email,
              emailVerified: login.emailVerified,
              phoneNumber: login.phoneNumber,
              currency: "",
              photoURL: login.photoURL,
              accessToken: login.accessToken,
              uid: login.uid,
              refreshToken: login.refreshToken,
            };
            return user;
          }),
          map((login: LoginResponseModel) => actions.loginSucess({ login })),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
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
          map((register: any) => {
            const user: LoginResponseModel = {
              displayName: register.displayName,
              email: register.email,
              emailVerified: register.emailVerified,
              phoneNumber: register.phoneNumber,
              currency: "",
              photoURL: register.photoURL,
              accessToken: register.accessToken,
              uid: register.uid,
              refreshToken: register.refreshToken,
            };
            return user;
          }),
          map((register: LoginResponseModel) =>
            actions.registerSucess({ register })
          ),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
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
          map((userDoc: LoginResponseModel) =>
            actions.setUserDocSuccess({ userDoc })
          ),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });

  updateProfile$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.updateProfile),
      switchMap(({ action }) =>
        this._firebaseService.updateProfile$(action).pipe(
          switchMap((updateProfileFB: LoginResponseModel) => {
            const message = "Usuario actualizado exitosamente";
            return [
              actions.updateProfileSuccess({ updateProfileFB }),
              sharedActions.setMessage({ message }),
            ];
          }),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
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
          switchMap((updateProfileFB: LoginResponseModel) => {
            return [
              actions.updateProfileFBSuccess({ updateProfileFB }),
            ];
          }),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });
}
