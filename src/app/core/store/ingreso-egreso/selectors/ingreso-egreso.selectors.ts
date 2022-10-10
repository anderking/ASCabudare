import { createSelector } from "@ngrx/store";
import { getIngresoEgreso } from "../index";
import * as fromIngresoEgreso from "../reducers/ingreso-egreso.reducer";

/** Exporta el array de identificadores de la entidad para el facade */
export const selectIds = createSelector(
  getIngresoEgreso,
  fromIngresoEgreso.selectIds // shorthand for clasificationsState => fromIngresoEgreso.selectIngresoEgresoIds(clasificationsState)
);
/** Exporta el diccionario de todos los items de la entidad para el facade */
export const selectEntities = createSelector(
  getIngresoEgreso,
  fromIngresoEgreso.selectEntities
);
/** Exporta un array de todos los items de la entidad para el facade */
export const selectAll = createSelector(
  getIngresoEgreso,
  fromIngresoEgreso.selectAll
);
/** Exporta el total de items en la entidad para el facade */
export const selectTotal = createSelector(
  getIngresoEgreso,
  fromIngresoEgreso.selectTotal
);
/** Exporta el identificador de un item actual para el facade */
export const selectCurrentId = createSelector(
  getIngresoEgreso,
  fromIngresoEgreso.selectCurrentId
);
/** Exporta el item actual para el facade */
export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (entities[id] ? entities[id] : null)
);
/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getIngresoEgreso,
  (state) => state.loading
);
