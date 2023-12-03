import { createSelector } from "@ngrx/store";
import { getLogin } from "..";

export const selectUserAuth = createSelector(getLogin, (state) => state.userAuth);

export const selectCurrentUser = createSelector(getLogin, (state) => state.currentUser);

export const selectUserDoc = createSelector(getLogin, (state) => state.userDoc);

export const selectUpdateProfile = createSelector(getLogin, (state) => state.updateProfile);

export const selectUpdateProfileFB = createSelector(getLogin, (state) => state.updateProfileFB);

export const selectLoading = createSelector(getLogin, (state) => state.loading);
