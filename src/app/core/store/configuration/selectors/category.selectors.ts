import { createSelector } from "@ngrx/store";
import { getCategory } from "../index";
import * as fromCategory from "../reducers/category.reducer";

/** Exporta el array de identificadores de la entidad para el facade */
export const selectIds = createSelector(
  getCategory,
  fromCategory.selectIds // shorthand for clasificationsState => fromCategory.selectCategoryIds(clasificationsState)
);
/** Exporta el diccionario de todos los items de la entidad para el facade*/
export const selectEntities = createSelector(
  getCategory,
  fromCategory.selectEntities
);
/** Exporta un array de todos los items de la entidad para el facade*/
export const selectAll = createSelector(
  getCategory,
  fromCategory.selectAll
);
/** Exporta el total de items en la entidad para el facade*/
export const selectTotal = createSelector(
  getCategory,
  fromCategory.selectTotal
);
/** Exporta el identificador de un item actual para el facade*/
export const selectCurrentId = createSelector(
  getCategory,
  fromCategory.selectCurrentId
);
/** Exporta el item actual para el facade */
export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (entities[id] ? entities[id] : null)
);
/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getCategory,
  (state) => state.loading
);
