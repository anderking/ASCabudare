import { ComboModel } from "@models/masters/combo.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "@store/masters/actions/combo.actions";

/** Se declara la interface del reducer */
export interface State {
  typeActive: ComboModel[];
  typeActiveLoading: boolean;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  typeActive: [],
  typeActiveLoading: false,
  loading: false,
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const comboReducer = createReducer(
  initialState,

  on(actions.searchTypeActive, (state) => ({
    ...state,
    typeActiveLoading: true,
    loading: true,
  })),

  on(actions.loadTypeActive, (state, { items }) => {
    return {
      ...state,
      typeActive: items,
      typeActiveLoading: false,
      loading: false,
    };
  }),

  on(actions.resetCombos, (state) => {
    return { ...initialState };
  }),

  on(actions.resetLoading, (state) => {
    return {
      ...state,
      typeActiveLoading: false,
      loading: false,
    };
  })
);

/** Se exporta la funcion reducer que contiene  el store */
export function reducer(state: State | undefined, action: Action) {
  return comboReducer(state, action);
}
