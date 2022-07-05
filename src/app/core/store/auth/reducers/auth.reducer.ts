import { Action, createReducer, on } from "@ngrx/store";
import { LoginModel } from "@models/auth/login.model";
import { authActions } from "@store/auth/actions";
import { UserModel } from "@models/auth/user.model";


/** Se declara la interface del reducer */
export interface State {
  login: LoginModel;
  register: LoginModel;
  user: UserModel;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  login: null,
  register: null,
  user: null,
  loading: false,
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const authReducer = createReducer(
  initialState,

  on(authActions.login, (state) => ({
    ...state,
    loading: true,
  })),

  on(authActions.loginSucess, (state, { login }) => ({
    ...state,
    login,
    loading: false,
  })),

  on(authActions.register, (state) => ({
    ...state,
    loading: true,
  })),

  on(authActions.registerSucess, (state, { register }) => ({
    ...state,
    register,
    loading: false,
  })),

  on(authActions.setuser, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),

  on(authActions.clear, (state) => {
    return {
      ...state,
      login: null,
      register: null,
    };
  }),

  on(authActions.resetLoading, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
);

/** Se exporta la funcion reducer que contiene todo el store */
export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
