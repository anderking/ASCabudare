import { ComboModel } from "@models/masters/combo.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as ComboActions from "../actions/combo.actions";

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
  
  on(ComboActions.searchTypeActive, (state) => ({
    ...state,
    typeActiveLoading: true,
    loading: true,
  })),

  on(ComboActions.loadTypeActive, (state, { items }) => {
    return {
      ...state,
      typeActive: items,
      typeActiveLoading: false,
      loading: false,
    };
  }),

  on(ComboActions.clearCombos, (state) => {
    return { ...initialState };
  }),

  on(ComboActions.resetLoading, (state) => {
    return {
      ...state,
      typeActiveLoading: false,
      loading: false,
    };
  })
);

/** Se exporta la funcion reducer que contiene todo el store */
export function reducer(state: State | undefined, action: Action) {
  //console.log("STATE==>>",state)
  return comboReducer(state, action);
}
