import { createSelector } from "@ngrx/store";
import { getLogin } from "..";

export const selectLogin = createSelector(getLogin, (state) => state.login);

export const selectRegister = createSelector(
  getLogin,
  (state) => state.register
);

export const selectCurrentUser = createSelector(getLogin, (state) => state.currentUser);

export const selectUserDoc = createSelector(getLogin, (state) => state.userDoc);

export const selectLoading = createSelector(getLogin, (state) => state.loading);
