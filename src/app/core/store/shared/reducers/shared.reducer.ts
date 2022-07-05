import { Action, createReducer, on } from "@ngrx/store";
import { sharedActions } from "@store/shared/actions";

/** Se declara la interface del reducer */
export interface State {
  message: string;
  error: string;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  message: null,
  error: null,
  loading: false,
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const sharedReducer = createReducer(
  initialState,

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
  return sharedReducer(state, action);
}
