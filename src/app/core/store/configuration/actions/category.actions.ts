import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { CategoryModel } from "@models/configurations/category.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApi = createAction(
  "[Category/API] searchApi Categories",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApi = createAction(
  "[Category/API] searchOneApi Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApi = createAction(
  "[Category/API] createApi Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApi = createAction(
  "[Category/API] updateApi Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApi = createAction(
  "[Category/API] deleteApi Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const setAll = createAction(
  "[Category/API] setAll Categories",
  props<{ items: CategoryModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setOne = createAction(
  "[Category/API] setOne Category",
  props<{ item: CategoryModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addOne = createAction(
  "[Category/API] addOne Category",
  props<{ item: CategoryModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addMany = createAction(
  "[Category/API] addMany Categories",
  props<{ items: CategoryModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateOne = createAction(
  "[Category/API] updateOne Category",
  props<{ item: Update<CategoryModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateMany = createAction(
  "[Category/API] updateMany Categories",
  props<{ items: Update<CategoryModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertOne = createAction(
  "[Category/API] upsertOne Category",
  props<{ item: CategoryModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertMany = createAction(
  "[Category/API] upsertMany Categories",
  props<{ items: CategoryModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const removeOne = createAction(
  "[Category/API] removeOne Category",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const removeMany = createAction(
  "[Category/API] removeMany Categories",
  props<{ ids: string[] }>()
);
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentItemId = createAction(
  "[Category/API] setCurrentItemId Category",
  props<{ id: string | number }>()
);
/** Esta acción permite resetear el registro actual del store */
export const resetSelected = createAction(
  "[Category/API] resetSelected Category"
);
/** Esta acción permite resetear  el sotre de la entidad */
export const reset = createAction("[Category/API] reset Categories");
/** Esta acción permite limpiar el loading del store */
export const resetLoading = createAction(
  "[Category/API] resetLoading Category"
);
