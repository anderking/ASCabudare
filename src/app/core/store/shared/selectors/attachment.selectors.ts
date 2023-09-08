import { createSelector } from "@ngrx/store";
import { getAttachment } from "..";

export const selectUrlAttachment = createSelector(
  getAttachment,
  (state) => state.urlAttachment
);

export const selectLoading = createSelector(
  getAttachment,
  (state) => state.loading
);
