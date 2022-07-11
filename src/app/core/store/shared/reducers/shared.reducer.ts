import { ErrorModel } from "@models/shared/error.model";
import { Action, createReducer, on } from "@ngrx/store";
import { sharedActions } from "@store/shared/actions";

/** Se declara la interface del reducer */
export interface State {
  message: string;
  error: ErrorModel;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  message: null,
  error: null,
  loading: false,
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,

  on(sharedActions.setMessage, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),

  on(sharedActions.setError, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  on(sharedActions.clear, (state) => {
    return {
      ...state,
      message: null,
      error: null,
    };
  }),

  on(sharedActions.resetLoading, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
);

/** Se exporta la funcion reducer que contiene todo el store */
export function reducer(state: State | undefined, action: Action) {
  return entityReducer(state, action);
}
