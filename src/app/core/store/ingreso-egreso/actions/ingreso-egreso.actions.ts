import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApiIngresoEgresos = createAction(
  "[IngresoEgreso/API] Search IngresoEgresos",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApiIngresoEgreso = createAction(
  "[IngresoEgreso/API] SearchOne IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApiIngresoEgreso = createAction(
  "[IngresoEgreso/API] CreateApi IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApiIngresoEgreso = createAction(
  "[IngresoEgreso/API] UpdateApi IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApiIngresoEgreso = createAction(
  "[IngresoEgreso/API] DeleteApi IngresoEgreso",
  props<{ props: DataActionModel<IngresoEgresoModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const loadIngresoEgresos = createAction(
  "[IngresoEgreso/API] Load IngresoEgresos",
  props<{ items: IngresoEgresoModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setIngresoEgreso = createAction(
  "[IngresoEgreso/API] Set IngresoEgreso",
  props<{ item: IngresoEgresoModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addIngresoEgreso = createAction(
  "[IngresoEgreso/API] Add IngresoEgreso",
  props<{ item: IngresoEgresoModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addIngresoEgresos = createAction(
  "[IngresoEgreso/API] Add IngresoEgresos",
  props<{ items: IngresoEgresoModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateIngresoEgreso = createAction(
  "[IngresoEgreso/API] Update IngresoEgreso",
  props<{ item: Update<IngresoEgresoModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateIngresoEgresos = createAction(
  "[IngresoEgreso/API] Update IngresoEgresos",
  props<{ items: Update<IngresoEgresoModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertIngresoEgreso = createAction(
  "[IngresoEgreso/API] Upsert IngresoEgreso",
  props<{ item: IngresoEgresoModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertIngresoEgresos = createAction(
  "[IngresoEgreso/API] Upsert IngresoEgresos",
  props<{ items: IngresoEgresoModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const deleteIngresoEgreso = createAction(
  "[IngresoEgreso/API] Delete IngresoEgreso",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const deleteIngresoEgresos = createAction(
  "[IngresoEgreso/API] Delete IngresoEgresos",
  props<{ ids: string[] }>()
);
/** removeAll: elimina todas las entidades del objeto de estado de entidad. */
export const clearIngresoEgresos = createAction(
  "[IngresoEgreso/API] Clear IngresoEgresos"
);
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentIngresoEgresoId = createAction(
  "[IngresoEgreso/API] Set CurrentIngresoEgresoId",
  props<{ id: string | number }>()
);
/** removeAll: elimina todas las entidades del objeto de estado de entidad. */
export const clearCurrentIngresoEgreso = createAction(
  "[IngresoEgreso/API] Clear CurrentIngresoEgreso"
);
/** Esta acción permite limpiar el store */
export const resetLoading = createAction("[IngresoEgreso/API] Set Loading");
