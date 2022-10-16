import { createSelector } from "@ngrx/store";
import { getShared } from "..";

export const selectMessage = createSelector(
  getShared,
  (state) => state.message
);

export const selectError = createSelector(getShared, (state) => state.error);

export const selectLoading = createSelector(
  getShared,
  (state) => state.loading
);

export const selectUrlAttachment = createSelector(
  getShared,
  (state) => state.urlAttachment
);
