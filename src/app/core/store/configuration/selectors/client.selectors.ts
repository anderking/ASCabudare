import { createSelector } from "@ngrx/store";
import { getClient } from "../index";
import * as fromClient from "../reducers/client.reducer";

/** Exporta el array de identificadores de la entidad para el facade */
export const selectIds = createSelector(
  getClient,
  fromClient.selectIds // shorthand for clientState => fromClient.selectClientIds(clientState)
);
/** Exporta el diccionario de todos los items de la entidad para el facade */
export const selectEntities = createSelector(
  getClient,
  fromClient.selectEntities
);
/** Exporta un array de todos los items de la entidad para el facade */
export const selectAll = createSelector(getClient, fromClient.selectAll);
/** Exporta el total de items en la entidad para el facade */
export const selectTotal = createSelector(
  getClient,
  fromClient.selectTotal
);
/** Exporta el identificador de un item actual para el facade */
export const selectCurrentId = createSelector(
  getClient,
  fromClient.selectCurrentId
);
/** Exporta el item actual para el facade */
export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (entities[id] ? entities[id] : null)
);
/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getClient,
  (state) => state.loading
);
