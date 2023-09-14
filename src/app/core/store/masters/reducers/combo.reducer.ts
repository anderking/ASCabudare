import { ComboModel } from "@models/masters/combo.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "@store/masters/actions/combo.actions";

/** Se declara la interface del reducer */
export interface State {
  typeActive: ComboModel[];
  typeActiveLoading: boolean;
  documentType: ComboModel[];
  documentTypeLoading: boolean;
  stateSolvency: ComboModel[];
  stateSolvencyLoading: boolean;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  typeActive: [],
  typeActiveLoading: false,
  documentType: [],
  documentTypeLoading: false,
  stateSolvency: [],
  stateSolvencyLoading: false,
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

  on(actions.searchDocumentType, (state) => ({
    ...state,
    documentTypeLoading: true,
    loading: true,
  })),

  on(actions.loadDocumentType, (state, { items }) => {
    return {
      ...state,
      documentType: items,
      documentTypeLoading: false,
      loading: false,
    };
  }),

  on(actions.searchStateSolvency, (state) => ({
    ...state,
    stateSolvencyLoading: true,
    loading: true,
  })),

  on(actions.loadStateSolvency, (state, { items }) => {
    return {
      ...state,
      stateSolvency: items,
      stateSolvencyLoading: false,
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
      documentTypeLoading: false,
      stateSolvencyLoading: false,
      loading: false,
    };
  })
);

/** Se exporta la funcion reducer que contiene  el store */
export function reducer(state: State | undefined, action: Action) {
  return comboReducer(state, action);
}
