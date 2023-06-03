import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { FirebaseService } from "@services/firebase.service";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as actions from "@store/configuration/actions/category.actions";
import * as sharedActions from "@store/shared/actions/shared.actions";
import { CategoryModel } from "@models/configurations/category.model";
import { TranslateService } from "@ngx-translate/core";
/**
 * Efecto para escuchar acciones de la entidad
 */
@Injectable()
export class CategoryEffects {
  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  search$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchApi),
      switchMap((params) =>
        this.firebaseService.search$(params.props).pipe(
          switchMap((items: CategoryModel[]) => {
            return [actions.setAll({ items })];
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
  searchOne$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchOneApi),
      switchMap((params) =>
        this.firebaseService.searchOne$(params.props).pipe(
          switchMap((item: CategoryModel) => {
            return [actions.setOne({ item })];
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
      ofType(actions.createApi),
      switchMap((params) =>
        this.firebaseService.create$(params.props).pipe(
          switchMap((item: CategoryModel) => {
            let message = this.translateService.instant(
              "MESSAGES.CREATE_SUCCESS"
            );
            const payload: any = params.props.payload;
            console.log(payload);
            if (payload.id) {
              message = this.translateService.instant(
                "MESSAGES.UPDATE_SUCCESS"
              );
            }
            return [
              actions.addOne({ item }),
              sharedActions.setMessage({ message }),
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
      ofType(actions.deleteApi),
      switchMap((params) =>
        this.firebaseService.delete$(params.props).pipe(
          switchMap((item: any) => {
            const message = this.translateService.instant(
              "MESSAGES.DELETE_SUCCESS"
            );
            item = params.props.payload;
            const id = item.id;
            return [
              actions.removeOne({ id }),
              sharedActions.setMessage({ message }),
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
   * @param _actions$ Contiene la librería de acciones
   * @param firebaseService Contiene los servicios para conectar con Firebase
   */
  constructor(
    private _actions$: Actions,
    private firebaseService: FirebaseService<CategoryModel | CategoryModel[]>,
    private translateService: TranslateService
  ) {}
}
