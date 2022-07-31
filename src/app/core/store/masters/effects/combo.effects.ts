import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { FirebaseService } from "@services/firebase.service";
import { of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import * as actions from "../actions/combo.actions";
import { sharedActions } from "@store/shared/actions";
import { ComboModel } from "@models/masters/combo.model";
/**
 * Efecto para escuchar acciones de la entidad
 */
@Injectable()
export class ComboEffects {
  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  searchCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchCategory),
      switchMap((params) =>
        this.firebaseService.search$(params.props).pipe(
          switchMap((items: ComboModel[]) => {
            return [actions.loadCategory({ items })];
          }),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
   searchTypeActive$ = createEffect(() =>
   this._actions$.pipe(
     ofType(actions.searchTypeActive),
     switchMap((params) =>
       this.firebaseService.search$(params.props).pipe(
         switchMap((items: ComboModel[]) => {
           return [actions.loadTypeActive({ items })];
         }),
         catchError((error) =>
           of(sharedActions.setError({ error }), actions.resetLoading())
         )
       )
     )
   )
 );

  /**
   * Se manejan los inyecciones de acciones y modelos que se necesitan en el efecto.
   * @param _actions$
   * @param firebaseService
   */
  constructor(
    private _actions$: Actions,
    private firebaseService: FirebaseService<ComboModel | ComboModel[]>
  ) {}
}
