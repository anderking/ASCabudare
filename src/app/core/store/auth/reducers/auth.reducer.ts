import { Action, createReducer, on } from "@ngrx/store";
import { CurrentUserModel, UserAuthModel } from "@models/auth/current-user.model";
import * as actions from "../actions/auth.actions";

/** Se declara la interface del reducer */
export interface State {
  userAuth: UserAuthModel;
  userDoc: CurrentUserModel;
  currentUser: CurrentUserModel;
  updateProfile: boolean;
  updateProfileFB: boolean;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  userAuth: null,
  userDoc: null,
  currentUser: null,
  updateProfile: false,
  updateProfileFB: false,
  loading: false,
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,

  on(actions.login, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.loginSucess, (state, { userAuth }) => ({
    ...state,
    userAuth,
    loading: false,
  })),

  on(actions.loginGoogle, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.loginGoogleSucess, (state, { userAuth }) => ({
    ...state,
    userAuth,
    loading: false,
  })),

  on(actions.register, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.registerSucess, (state, { userAuth }) => ({
    ...state,
    userAuth,
    loading: false,
  })),

  on(actions.setUserDoc, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.setUserDocSuccess, (state, { userDoc }) => ({
    ...state,
    userDoc,
    loading: false,
  })),

  on(actions.updateProfile, (state) => ({
    ...state,
    updateProfile: true,
  })),

  on(actions.updateProfileSuccess, (state, { updateProfileFB }) => ({
    ...state,
    currentUser: updateProfileFB,
    updateProfile: false,
  })),

  on(actions.updateProfileFB, (state) => ({
    ...state,
    updateProfileFB: true,
  })),

  on(actions.updateProfileFBSuccess, (state, { updateProfileFB }) => ({
    ...state,
    updateProfileFB: false,
  })),

  on(actions.setCurrentUser, (state, { currentUser }) => ({
    ...state,
    currentUser,
    loading: false,
  })),

  on(actions.verifyEmail, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.verifyEmailSuccess, (state, { message }) => ({
    ...state,
    loading: false,
  })),

  on(actions.forgotPassword, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.forgotPasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
  })),

  on(actions.reset, (state) => {
    return {
      ...state,
      login: null,
      register: null,
      userDoc: null,
      currentUser: null,
      loading: false,
      updateProfile: false,
      updateProfileFB: false,
    };
  }),

  on(actions.resetLoading, (state) => {
    return {
      ...state,
      loading: false,
      updateProfile: false,
      updateProfileFB: false,
    };
  })
);

/** Se exporta la funcion reducer que contiene  el store */
export function reducer(state: State | undefined, action: Action) {
  return entityReducer(state, action);
}
