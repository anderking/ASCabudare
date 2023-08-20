import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { FirebaseService } from "@services/firebase.service";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as attachmentActions from "@store/shared/actions/attachment.actions";
import * as sharedActions from "@store/shared/actions/shared.actions";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class SharedEffects {
  /**
   * Efecto que escucha la acción de crear nuevos registros de la entidad
   */
  create$ = createEffect(() =>
    this._actions$.pipe(
      ofType(attachmentActions.createAttachment),
      switchMap((params) =>
        this.firebaseService.uploadAttachment$(params.props).pipe(
          switchMap((urlAttachment: string) => {
            const message = this.translateService.instant(
              "MESSAGES.UPLOAD_FILE_SUCCESS"
            );
            return [
              attachmentActions.createAttachmentSuccess({ urlAttachment }),
              sharedActions.setMessage({ message }),
            ];
          }),
          catchError((error) =>
            of(
              sharedActions.setError({ error }),
              attachmentActions.resetLoading()
            )
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
    private firebaseService: FirebaseService<any>,
    private translateService: TranslateService
  ) {}
}
