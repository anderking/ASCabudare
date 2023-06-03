import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApi = createAction(
  "[IngresoEgreso/API] searchApi IngresoEgresos",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApi = createAction(
  "[IngresoEgreso/API] searchOneApi IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApi = createAction(
  "[IngresoEgreso/API] createApi IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApi = createAction(
  "[IngresoEgreso/API] updateApi IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApi = createAction(
  "[IngresoEgreso/API] DeleteApi IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const setAll = createAction(
  "[IngresoEgreso/API] setAll IngresoEgresos",
  props<{ items: IngresoEgresoModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setOne = createAction(
  "[IngresoEgreso/API] setOne IngresoEgreso",
  props<{ item: IngresoEgresoModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addOne = createAction(
  "[IngresoEgreso/API] addOne IngresoEgreso",
  props<{ item: IngresoEgresoModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addMany = createAction(
  "[IngresoEgreso/API] addMany IngresoEgresos",
  props<{ items: IngresoEgresoModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateOne = createAction(
  "[IngresoEgreso/API] updateOne IngresoEgreso",
  props<{ item: Update<IngresoEgresoModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateMany = createAction(
  "[IngresoEgreso/API] updateMany IngresoEgresos",
  props<{ items: Update<IngresoEgresoModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertOne = createAction(
  "[IngresoEgreso/API] upsertOne IngresoEgreso",
  props<{ item: IngresoEgresoModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertMany = createAction(
  "[IngresoEgreso/API] upsertMany IngresoEgresos",
  props<{ items: IngresoEgresoModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const removeOne = createAction(
  "[IngresoEgreso/API] removeOne IngresoEgreso",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const removeMany = createAction(
  "[IngresoEgreso/API] removeMany IngresoEgresos",
  props<{ ids: string[] }>()
);
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentItemId = createAction(
  "[IngresoEgreso/API] setCurrentItemId IngresoEgreso",
  props<{ id: string | number }>()
);
/** Esta acción permite resetear el registro actual del store */
export const resetSelected = createAction("[IngresoEgreso/API] resetSelected IngresoEgreso");
/** Esta acción permite resetear todo el sotre de la entidad */
export const reset = createAction("[IngresoEgreso/API] reset IngresoEgresos");
/** Esta acción permite limpiar el loading del store */
export const resetLoading = createAction("[IngresoEgreso/API] resetLoading IngresoEgreso");
