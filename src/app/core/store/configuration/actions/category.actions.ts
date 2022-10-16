import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { CategoryModel } from "@models/configurations/category.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApiCategorys = createAction(
  "[Category/API] Search Categorys",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApiCategory = createAction(
  "[Category/API] SearchOne Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApiCategory = createAction(
  "[Category/API] CreateApi Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApiCategory = createAction(
  "[Category/API] UpdateApi Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApiCategory = createAction(
  "[Category/API] DeleteApi Category",
  props<{ props: DataActionModel<CategoryModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const loadCategorys = createAction(
  "[Category/API] Load Categorys",
  props<{ items: CategoryModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setCategory = createAction(
  "[Category/API] Set Category",
  props<{ item: CategoryModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addCategory = createAction(
  "[Category/API] Add Category",
  props<{ item: CategoryModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addCategorys = createAction(
  "[Category/API] Add Categorys",
  props<{ items: CategoryModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateCategory = createAction(
  "[Category/API] Update Category",
  props<{ item: Update<CategoryModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateCategorys = createAction(
  "[Category/API] Update Categorys",
  props<{ items: Update<CategoryModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertCategory = createAction(
  "[Category/API] Upsert Category",
  props<{ item: CategoryModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertCategorys = createAction(
  "[Category/API] Upsert Categorys",
  props<{ items: CategoryModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const deleteCategory = createAction(
  "[Category/API] Delete Category",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const deleteCategorys = createAction(
  "[Category/API] Delete Categorys",
  props<{ ids: string[] }>()
);
/** removeAll: elimina todas las entidades del objeto de estado de entidad. */
export const clearCategorys = createAction("[Category/API] Clear Categorys");
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentCategoryId = createAction(
  "[Category/API] Set CurrentCategoryId",
  props<{ id: string | number }>()
);
/** removeAll: elimina todas las entidades del objeto de estado de entidad. */
export const clearCurrentCategory = createAction(
  "[Category/API] Clear CurrentCategory"
);
/** Esta acción permite limpiar el store */
export const resetLoading = createAction("[Category/API] Set Loading");
