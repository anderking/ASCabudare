import { createSelector } from "@ngrx/store";
import { getPay } from "../index";
import * as fromPay from "../reducers/pay.reducer";

/** Exporta el array de identificadores de la entidad para el facade */
export const selectIds = createSelector(
  getPay,
  fromPay.selectIds // shorthand for clasificationsState => fromPay.selectPayIds(clasificationsState)
);
/** Exporta el diccionario de todos los items de la entidad para el facade */
export const selectEntities = createSelector(
  getPay,
  fromPay.selectEntities
);
/** Exporta un array de todos los items de la entidad para el facade */
export const selectAll = createSelector(getPay, fromPay.selectAll);
/** Exporta el total de items en la entidad para el facade */
export const selectTotal = createSelector(getPay, fromPay.selectTotal);
/** Exporta el identificador de un item actual para el facade */
export const selectCurrentId = createSelector(
  getPay,
  fromPay.selectCurrentId
);
/** Exporta el item actual para el facade */
export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (entities[id] ? entities[id] : null)
);
/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getPay,
  (state) => state.loading
);
