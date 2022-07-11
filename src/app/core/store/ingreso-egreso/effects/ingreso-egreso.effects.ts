import { Injectable } from "@angular/core";
import { IngresoEgresoModel } from "@models/ingreso-egreso.model";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { FirebaseService } from "@services/firebase.service";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as actions from "../actions/ingreso-egreso.actions";
import { sharedActions } from "@store/shared/actions";
/**
 * Efecto para escuchar acciones de la entidad
 */
@Injectable()
export class IngresoEgresoEffects {
  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  search$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchApiIngresoEgresos),
      switchMap((params) =>
        this.firebaseService.search$(params.props).pipe(
          switchMap((items: IngresoEgresoModel[]) => {
            return [actions.loadIngresoEgresos({ items })];
          }),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de crear nuevos registros de la entidad
   */
  create$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.createApiIngresoEgreso),
      switchMap((params) =>
        this.firebaseService.create$(params.props).pipe(
          switchMap((item: IngresoEgresoModel) => {
            const message = "Agregado exitosamente";
            return [
              sharedActions.setMessage({ message }),
              actions.addIngresoEgreso({ item }),
            ];
          }),
          catchError((error) =>
            of(sharedActions.setError({ error }), actions.resetLoading())
          )
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de eliminar un registro de la entidad
   */
  delete$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.deleteApiIngresoEgreso),
      switchMap((params) =>
        this.firebaseService.delete$(params.props).pipe(
          switchMap((item: any) => {
            const message = "Registro eliminado";
            item = params.props.payload;
            const id = item.id;
            return [
              sharedActions.setMessage({ message }),
              actions.deleteIngresoEgreso({ id }),
            ];
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
    private firebaseService: FirebaseService<
      IngresoEgresoModel | IngresoEgresoModel[]
    >
  ) {}
}
