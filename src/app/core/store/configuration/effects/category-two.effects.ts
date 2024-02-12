import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as actions from "@store/configuration/actions/category.actions";
import * as notificationActions from "@store/shared/actions/notification.actions";
import { CategoryModel } from "@models/configurations/category.model";
import { TranslateService } from "@ngx-translate/core";
import { ApiService } from "@services/api.service";
import { ResponseApiModel } from "@models/common/response-api.model";
/**
 * Efecto para escuchar acciones de la entidad
 */
@Injectable()
export class CategoryTwoEffects {
  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  search$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchApi),
      switchMap((params) =>
        this.apiService.searchGetAll$(params.props).pipe(
          switchMap((response: ResponseApiModel<CategoryModel[]>) => {
            const items = response.data;
            return [actions.setAll({ items })];
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
  searchOne$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchOneApi),
      switchMap((params) =>
        this.apiService.searchGetOne$(params.props).pipe(
          switchMap((response: ResponseApiModel<CategoryModel>) => {
            const item = response.data;
            return [actions.setOne({ item })];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
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
        this.apiService.create$(params.props).pipe(
          switchMap((response: ResponseApiModel<CategoryModel>) => {
            const item = response.data;
            let message = this.translateService.instant(
              "MESSAGES.CREATE_SUCCESS"
            );
            const payload: any = params.props.payload;
            if (payload.id) {
              message = this.translateService.instant(
                "MESSAGES.UPDATE_SUCCESS"
              );
            }
            return [
              actions.addOne({ item }),
              notificationActions.setMessage({ message }),
            ];
          }),
          catchError((error) =>
            of(notificationActions.setError({ error }), actions.resetLoading())
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
        this.apiService.delete$(params.props).pipe(
          switchMap((response: ResponseApiModel<CategoryModel>) => {
            const id = response.data.id;
            const message = this.translateService.instant(
              "MESSAGES.DELETE_SUCCESS"
            );
            return [
              actions.removeOne({ id }),
              notificationActions.setMessage({ message }),
            ];
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
   * @param apiService Contiene los servicios para conectar con Firebase
   */
  constructor(
    private _actions$: Actions,
    private apiService: ApiService<CategoryModel | CategoryModel[]>,
    private translateService: TranslateService
  ) {}
}
