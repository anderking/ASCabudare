import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { PayModel } from "@models/management/pay.model";
import { CurrentFilterModel } from "@models/shared/filter.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApi = createAction(
  "[Pay/API] searchApi Pays",
  props<{ props: DataActionModel<PayModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApi = createAction(
  "[Pay/API] searchOneApi Pay",
  props<{ props: DataActionModel<PayModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApi = createAction(
  "[Pay/API] createApi Pay",
  props<{ props: DataActionModel<PayModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApi = createAction(
  "[Pay/API] updateApi Pay",
  props<{ props: DataActionModel<PayModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApi = createAction(
  "[Pay/API] DeleteApi Pay",
  props<{ props: DataActionModel<PayModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const setAll = createAction(
  "[Pay/API] setAll Pays",
  props<{ items: PayModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setOne = createAction(
  "[Pay/API] setOne Pay",
  props<{ item: PayModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addOne = createAction(
  "[Pay/API] addOne Pay",
  props<{ item: PayModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addMany = createAction(
  "[Pay/API] addMany Pays",
  props<{ items: PayModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateOne = createAction(
  "[Pay/API] updateOne Pay",
  props<{ item: Update<PayModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateMany = createAction(
  "[Pay/API] updateMany Pays",
  props<{ items: Update<PayModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertOne = createAction(
  "[Pay/API] upsertOne Pay",
  props<{ item: PayModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertMany = createAction(
  "[Pay/API] upsertMany Pays",
  props<{ items: PayModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const removeOne = createAction(
  "[Pay/API] removeOne Pay",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const removeMany = createAction(
  "[Pay/API] removeMany Pays",
  props<{ ids: string[] }>()
);
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentItemId = createAction(
  "[Pay/API] setCurrentItemId Pay",
  props<{ id: string | number }>()
);
/** Esta acción permite resetear el registro actual del store */
export const resetSelected = createAction(
  "[Pay/API] resetSelected Pay"
);
/** Esta acción permite resetear  el sotre de la entidad */
export const reset = createAction("[Pay/API] reset Pays");
/** Esta acción permite limpiar el loading del store */
export const resetLoading = createAction(
  "[Pay/API] resetLoading Pay"
);

export const setCurrentFilter = createAction(
  "[Pay/App] setCurrentFilter Pay",
  props<{ currentFilter: CurrentFilterModel }>()
);
