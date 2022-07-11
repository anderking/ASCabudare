import { createSelector } from "@ngrx/store";
import { getLogin } from "..";

export const selectLogin = createSelector(getLogin, (state) => state.login);

export const selectRegister = createSelector(
  getLogin,
  (state) => state.register
);

export const selectUser = createSelector(getLogin, (state) => state.currentUser);

export const selectLoading = createSelector(getLogin, (state) => state.loading);
