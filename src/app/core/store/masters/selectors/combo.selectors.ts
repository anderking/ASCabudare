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

/** Exporta el select para el facade */
export const selectStateSolvency = createSelector(
  getMasters,
  (state) => state.stateSolvency
);
/** Exporta el loading para el facade */
export const selectStateSolvencyLoading = createSelector(
  getMasters,
  (state) => state.stateSolvencyLoading
);

/** Exporta el select para el facade */
export const selectCurrency = createSelector(
  getMasters,
  (state) => state.currency
);
/** Exporta el loading para el facade */
export const selectCurrencyLoading = createSelector(
  getMasters,
  (state) => state.currencyLoading
);

/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getMasters,
  (state) => state.loading
);
