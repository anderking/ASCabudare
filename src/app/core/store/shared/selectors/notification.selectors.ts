import { createSelector } from "@ngrx/store";
import { getNotification } from "..";

export const selectMessage = createSelector(
  getNotification,
  (state) => state.message
);

export const selectError = createSelector(
  getNotification,
  (state) => state.error
);

export const selectLoading = createSelector(
  getNotification,
  (state) => state.loading
);
