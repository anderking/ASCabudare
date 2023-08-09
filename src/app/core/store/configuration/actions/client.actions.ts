import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { ClientModel } from "@models/configurations/client.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApi = createAction(
  "[Client/API] searchApi Clients",
  props<{ props: DataActionModel<ClientModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApi = createAction(
  "[Client/API] searchOneApi Client",
  props<{ props: DataActionModel<ClientModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApi = createAction(
  "[Client/API] createApi Client",
  props<{ props: DataActionModel<ClientModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApi = createAction(
  "[Client/API] updateApi Client",
  props<{ props: DataActionModel<ClientModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApi = createAction(
  "[Client/API] deleteApi Client",
  props<{ props: DataActionModel<ClientModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const setAll = createAction(
  "[Client/API] setAll Clients",
  props<{ items: ClientModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setOne = createAction(
  "[Client/API] setOne Client",
  props<{ item: ClientModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addOne = createAction(
  "[Client/API] addOne Client",
  props<{ item: ClientModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addMany = createAction(
  "[Client/API] addMany Clients",
  props<{ items: ClientModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateOne = createAction(
  "[Client/API] updateOne Client",
  props<{ item: Update<ClientModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateMany = createAction(
  "[Client/API] updateMany Clients",
  props<{ items: Update<ClientModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertOne = createAction(
  "[Client/API] upsertOne Client",
  props<{ item: ClientModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertMany = createAction(
  "[Client/API] upsertMany Clients",
  props<{ items: ClientModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const removeOne = createAction(
  "[Client/API] removeOne Client",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const removeMany = createAction(
  "[Client/API] removeMany Clients",
  props<{ ids: string[] }>()
);
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentItemId = createAction(
  "[Client/API] setCurrentItemId Client",
  props<{ id: string | number }>()
);
/** Esta acción permite resetear el registro actual del store */
export const resetSelected = createAction(
  "[Client/API] resetSelected Client"
);
/** Esta acción permite resetear  el sotre de la entidad */
export const reset = createAction("[Client/API] reset Clients");
/** Esta acción permite limpiar el loading del store */
export const resetLoading = createAction(
  "[Client/API] resetLoading Client"
);
