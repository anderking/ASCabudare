import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { FirebaseService } from "@services/firebase.service";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as actions from "../actions/attachment.actions";
import { sharedActions } from "@store/shared/actions";

@Injectable()
export class SharedEffects {
  /**
   * Efecto que escucha la acción de crear nuevos registros de la entidad
   */
  create$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.createAttachment),
      switchMap((params) =>
        this.firebaseService.uploadAttachment$(params.props).pipe(
          switchMap((urlAttachment: string) => {
            return [actions.createAttachmentSuccess({ urlAttachment })];
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
   * @param _actions$ Contiene la librería de acciones
   * @param firebaseService Contiene los servicios para conectar con Firebase
   */
  constructor(
    private _actions$: Actions,
    private firebaseService: FirebaseService<any>
  ) {}
}
