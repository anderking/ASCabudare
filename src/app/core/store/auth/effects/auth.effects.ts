import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ApiService } from "@services/api.service";
import { LoginModel } from "@models/auth/login.model";
import { authActions } from "@store/auth/actions/index";
import { sharedActions } from "@store/shared/actions";
import { FirebaseService } from "@services/firebase.service";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService<LoginModel>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ action }) =>
        this.firebaseService.createUserWithEmailAndPassword$(action).pipe(
          map((login: LoginModel) => authActions.loginSucess({ login })),
          catchError((error) =>
            of(sharedActions.setError({ error }), authActions.resetLoading())
          )
        )
      )
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ action }) =>
        this.firebaseService.signInWithEmailAndPassword$(action).pipe(
          map((register: LoginModel) =>
            authActions.registerSucess({ register })
          ),
          catchError((error) =>
            of(sharedActions.setError({ error }), authActions.resetLoading())
          )
        )
      )
    );
  });
}
