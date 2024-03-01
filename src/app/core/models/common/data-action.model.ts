import { AttachmentModel } from "@models/shared/attachment.model";

export interface DataActionModel<T> {
  url: string;
  collection?: string;
  payload?: T | T[];
  id?: string,
  currentFile?: AttachmentModel,
}
