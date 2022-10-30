import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { authReducer } from "@store/auth/reducers";

export const authFeatureKey = "auth";

export interface AuthState {
  auth: authReducer.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: authReducer.reducer,
};

export const getAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const getLogin = createSelector(
  getAuthState,
  (state: AuthState) => state.auth
);
