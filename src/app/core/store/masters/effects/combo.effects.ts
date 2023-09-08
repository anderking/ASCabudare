import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { FirebaseService } from "@services/firebase.service";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as actions from "@store/masters/actions/combo.actions";
import * as notificationActions from "@store/shared/actions/notification.actions";
import { ComboModel } from "@models/masters/combo.model";
/**
 * Efecto para escuchar acciones de la entidad
 */
@Injectable()
export class ComboEffects {
  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  searchTypeActive$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchTypeActive),
      switchMap((params) =>
        this.firebaseService.searchCombo$(params.props).pipe(
          switchMap((items: ComboModel[]) => {
            return [actions.loadTypeActive({ items })];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  searchDocumentType$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchDocumentType),
      switchMap((params) =>
        this.firebaseService.searchCombo$(params.props).pipe(
          switchMap((items: ComboModel[]) => {
            return [actions.loadDocumentType({ items })];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    )
  );

  /**
   * Se manejan los inyecciones de acciones y modelos que se necesitan en el efecto.
   * @param _actions$ Contiene la librería de acciones
   * @param firebaseService Contiene los servicios para conectar con Firebase
   */
  constructor(
    private _actions$: Actions,
    private firebaseService: FirebaseService<ComboModel | ComboModel[]>
  ) {}
}
