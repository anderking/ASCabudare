import { createAction, props } from "@ngrx/store";
import { DataActionModel } from "@models/common/data-action.model";
import { ComboModel } from "@models/masters/combo.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros del combo */
export const searchTypeActive = createAction(
  "[Combo/API] searchTypeActive Combo",
  props<{ props: DataActionModel<ComboModel> }>()
);
/** Al disparar la acción del search, esta se dispara a traves del efecto para reemplazar la colección actual con la colección provista */
export const loadTypeActive = createAction(
  "[Combo/API] loadTypeActive Combo",
  props<{ items: ComboModel[] }>()
);

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros del combo */
export const searchDocumentType = createAction(
  "[Combo/API] searchDocumentType Combo",
  props<{ props: DataActionModel<ComboModel> }>()
);
/** Al disparar la acción del search, esta se dispara a traves del efecto para reemplazar la colección actual con la colección provista */
export const loadDocumentType = createAction(
  "[Combo/API] loadDocumentType Combo",
  props<{ items: ComboModel[] }>()
);

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros del combo */
export const searchStateSolvency = createAction(
  "[Combo/API] searchStateSolvency Combo",
  props<{ props: DataActionModel<ComboModel> }>()
);
/** Al disparar la acción del search, esta se dispara a traves del efecto para reemplazar la colección actual con la colección provista */
export const loadStateSolvency = createAction(
  "[Combo/API] loadStateSolvency Combo",
  props<{ items: ComboModel[] }>()
);

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros del combo */
export const searchCurrency = createAction(
  "[Combo/API] searchCurrency Combo",
  props<{ props: DataActionModel<ComboModel> }>()
);
/** Al disparar la acción del search, esta se dispara a traves del efecto para reemplazar la colección actual con la colección provista */
export const loadCurrency = createAction(
  "[Combo/API] loadCurrency Combo",
  props<{ items: ComboModel[] }>()
);

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros del combo */
export const searchPayType = createAction(
  "[Combo/API] searchPayType Combo",
  props<{ props: DataActionModel<ComboModel> }>()
);
/** Al disparar la acción del search, esta se dispara a traves del efecto para reemplazar la colección actual con la colección provista */
export const loadPayType = createAction(
  "[Combo/API] loadPayType Combo",
  props<{ items: ComboModel[] }>()
);

/** Esta acción permite limpiar el store */
export const resetCombos = createAction("[Combo/API] resetCombos Combo");
/** Esta acción permite limpiar el store */
export const resetLoading = createAction("[Combo/API] resetLoading Combo");
