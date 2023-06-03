import { DataActionModel } from "@models/common/data-action.model";
import { AttachmentModel } from "@models/shared/attachment.model";
import { createAction, props } from "@ngrx/store";

/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createAttachment = createAction(
  "[Attachment/API] createAttachment Attachment",
  props<{ props: DataActionModel<AttachmentModel> }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const createAttachmentSuccess = createAction(
  "[Attachment/API] createAttachmentSuccess Attachment",
  props<{ urlAttachment: string }>()
);
/** Esta acción permite limpiar el store */
export const reset = createAction("[Attachment] reset Attachment");
/** Esta acción permite limpiar el store */
export const resetLoading = createAction(
  "[Attachment] resetLoading Attachment"
);
