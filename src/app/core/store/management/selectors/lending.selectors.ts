import { createSelector } from "@ngrx/store";
import { getLending } from "../index";
import * as fromLending from "../reducers/lending.reducer";

/** Exporta el array de identificadores de la entidad para el facade */
export const selectIds = createSelector(
  getLending,
  fromLending.selectIds // shorthand for clasificationsState => fromLending.selectLendingIds(clasificationsState)
);
/** Exporta el diccionario de todos los items de la entidad para el facade */
export const selectEntities = createSelector(
  getLending,
  fromLending.selectEntities
);
/** Exporta un array de todos los items de la entidad para el facade */
export const selectAll = createSelector(getLending, fromLending.selectAll);
/** Exporta el total de items en la entidad para el facade */
export const selectTotal = createSelector(getLending, fromLending.selectTotal);
/** Exporta el identificador de un item actual para el facade */
export const selectCurrentId = createSelector(
  getLending,
  fromLending.selectCurrentId
);
/** Exporta el item actual para el facade */
export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (entities[id] ? entities[id] : null)
);
/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getLending,
  (state) => state.loading
);
