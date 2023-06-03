import { ErrorModel } from "@models/shared/error.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as sharedActions from "@store/shared/actions/shared.actions";
import * as attachmentActions from "@store/shared/actions/attachment.actions";

/** Se declara la interface del reducer */
export interface State {
  message: string;
  error: ErrorModel;
  urlAttachment: string;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  message: null,
  error: null,
  urlAttachment: null,
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

  on(sharedActions.reset, (state) => {
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
  }),

  on(attachmentActions.createAttachment, (state) => ({
    ...state,
    loading: true,
  })),

  on(attachmentActions.createAttachmentSuccess, (state, { urlAttachment }) => {
    return {
      ...state,
      urlAttachment,
      loading: false,
    };
  }),

  on(attachmentActions.reset, (state) => {
    return {
      ...state,
      urlAttachment: null,
    };
  }),

  on(attachmentActions.resetLoading, (state) => {
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
