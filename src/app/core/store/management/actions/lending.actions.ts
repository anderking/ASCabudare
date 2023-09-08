import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { LendingModel } from "@models/management/lending.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApi = createAction(
  "[Lending/API] searchApi Lendings",
  props<{ props: DataActionModel<LendingModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApi = createAction(
  "[Lending/API] searchOneApi Lending",
  props<{ props: DataActionModel<LendingModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApi = createAction(
  "[Lending/API] createApi Lending",
  props<{ props: DataActionModel<LendingModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApi = createAction(
  "[Lending/API] updateApi Lending",
  props<{ props: DataActionModel<LendingModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApi = createAction(
  "[Lending/API] DeleteApi Lending",
  props<{ props: DataActionModel<LendingModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const setAll = createAction(
  "[Lending/API] setAll Lendings",
  props<{ items: LendingModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setOne = createAction(
  "[Lending/API] setOne Lending",
  props<{ item: LendingModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addOne = createAction(
  "[Lending/API] addOne Lending",
  props<{ item: LendingModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addMany = createAction(
  "[Lending/API] addMany Lendings",
  props<{ items: LendingModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateOne = createAction(
  "[Lending/API] updateOne Lending",
  props<{ item: Update<LendingModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateMany = createAction(
  "[Lending/API] updateMany Lendings",
  props<{ items: Update<LendingModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertOne = createAction(
  "[Lending/API] upsertOne Lending",
  props<{ item: LendingModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertMany = createAction(
  "[Lending/API] upsertMany Lendings",
  props<{ items: LendingModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const removeOne = createAction(
  "[Lending/API] removeOne Lending",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const removeMany = createAction(
  "[Lending/API] removeMany Lendings",
  props<{ ids: string[] }>()
);
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentItemId = createAction(
  "[Lending/API] setCurrentItemId Lending",
  props<{ id: string | number }>()
);
/** Esta acción permite resetear el registro actual del store */
export const resetSelected = createAction(
  "[Lending/API] resetSelected Lending"
);
/** Esta acción permite resetear  el sotre de la entidad */
export const reset = createAction("[Lending/API] reset Lendings");
/** Esta acción permite limpiar el loading del store */
export const resetLoading = createAction(
  "[Lending/API] resetLoading Lending"
);
