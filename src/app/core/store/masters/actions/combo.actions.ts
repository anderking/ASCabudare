import { createAction, props } from "@ngrx/store";
import { DataActionModel } from "@models/common/data-action.model";
import { ComboModel } from "@models/masters/combo.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros del combo*/
export const searchTypeActive = createAction(
  "[Combo/API] Search TypeActive",
  props<{ props: DataActionModel<ComboModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros del combo*/
export const searchCategory = createAction(
      "[Combo/API] Search Category",
      props<{ props: DataActionModel<ComboModel> }>()
    );
/** Al disparar la acción del search, esta se dispara a traves del efecto para reemplazar la colección actual con la colección provista*/
export const loadTypeActive = createAction(
  "[Combo/API] Load TypeActive",
  props<{ items: ComboModel[] }>()
);
/** Al disparar la acción del search, esta se dispara a traves del efecto para reemplazar la colección actual con la colección provista*/
export const loadCategory = createAction(
      "[Combo/API] Load Category",
      props<{ items: ComboModel[] }>()
    );
/** Esta acción permite limpiar el store*/
export const clearCombos = createAction("[Combo/API] Clear Combos");
/** Esta acción permite limpiar el store*/
export const resetLoading = createAction("[Combo/API] Set Loading");
