import { Action, createReducer, on } from "@ngrx/store";
import * as attachmentActions from "@store/shared/actions/attachment.actions";

/** Se declara la interface del reducer */
export interface State {
  urlAttachment: string;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  urlAttachment: null,
  loading: false,
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,

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

/** Se exporta la funcion reducer que contiene  el store */
export function reducer(state: State | undefined, action: Action) {
  return entityReducer(state, action);
}
