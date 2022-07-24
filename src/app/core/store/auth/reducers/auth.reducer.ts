import { Action, createReducer, on } from "@ngrx/store";
import { LoginResponseModel } from "@models/auth/login.model";
import * as actions from "../actions/auth.actions";
import { UserModel } from "@models/auth/user.model";

/** Se declara la interface del reducer */
export interface State {
  login: LoginResponseModel;
  register: LoginResponseModel;
  userDoc: string;
  currentUser: LoginResponseModel;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  login: null,
  register: null,
  userDoc: null,
  currentUser: null,
  loading: false,
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,

  on(actions.login, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.loginSucess, (state, { login }) => ({
    ...state,
    login,
    loading: false,
  })),

  on(actions.register, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.registerSucess, (state, { register }) => ({
    ...state,
    register,
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

  on(actions.setCurrentUser, (state, { currentUser }) => ({
    ...state,
    currentUser,
    loading: false,
  })),

  on(actions.clear, (state) => {
    return {
      ...state,
      login: null,
      register: null,
      userDoc: null,
      currentUser: null,
    };
  }),

  on(actions.resetLoading, (state) => {
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
