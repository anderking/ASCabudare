import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import {
  LoginFormModel,
  LoginResponseModel,
  RegisterFormModel,
  RegisterResponseModel,
} from "@models/auth/login.model";
import * as actions from "../actions/auth.actions";
import { sharedActions } from "@store/shared/actions";
import { FirebaseService } from "@services/firebase.service";

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _firebaseService: FirebaseService<
      | LoginFormModel
      | LoginResponseModel
      | RegisterFormModel
      | RegisterResponseModel
    >
  ) {}

  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.login),
      switchMap(({ action }) =>
        this._firebaseService.signInWithEmailAndPassword$(action).pipe(
          map((login: any) => {
            let user: LoginResponseModel = {
              displayName: login.displayName,
              email: login.email,
              emailVerified: login.emailVerified,
              phoneNumber: login.phoneNumber,
              photoURL: login.photoURL,
              ma: login.ma,
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
            let user: LoginResponseModel = {
              displayName: register.displayName,
              email: register.email,
              emailVerified: register.emailVerified,
              phoneNumber: register.phoneNumber,
              photoURL: register.photoURL,
              ma: register.ma,
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

  setUser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.setUserDoc),
      switchMap(({ action }) =>
        this._firebaseService.setUserDoc$(action).pipe(
          map((userDoc: string) => actions.setUserDocSuccess({ userDoc })),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    );
  });
}
