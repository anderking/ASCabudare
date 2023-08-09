import { createSelector } from "@ngrx/store";
import { getMasters } from "../index";

/** Exporta el select para el facade */
export const selectTypeActive = createSelector(
  getMasters,
  (state) => state.typeActive
);
/** Exporta el loading para el facade */
export const selectTypeActiveLoading = createSelector(
  getMasters,
  (state) => state.typeActiveLoading
);

/** Exporta el select para el facade */
export const selectDocumentType = createSelector(
  getMasters,
  (state) => state.documentType
);
/** Exporta el loading para el facade */
export const selectDocumentTypeLoading = createSelector(
  getMasters,
  (state) => state.documentTypeLoading
);

/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getMasters,
  (state) => state.loading
);
