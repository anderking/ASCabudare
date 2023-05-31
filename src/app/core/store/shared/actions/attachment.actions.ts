import { DataActionModel } from "@models/common/data-action.model";
import { AttachmentModel } from "@models/shared/attachment.model";
import { createAction, props } from "@ngrx/store";

export const createAttachment = createAction(
  "[Attachment/API] Create Attachment",
  props<{ props: DataActionModel<AttachmentModel> }>()
);

/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const createAttachmentSuccess = createAction(
  "[Attachment/API] Create AttachmentSuccess",
  props<{ urlAttachment: string }>()
);
export const clear = createAction("[Attachment] Clear Attachment");

export const resetLoading = createAction(
  "[Attachment] Reset Loading Attachment"
);
