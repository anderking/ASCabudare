import { CurrentUserModel } from "@models/auth/current-user.model";

export interface ModalModel<T> {
  type: "confirmation" | "information" | "custom";
  item: T;
  title: string;
  message?: string;
  buttonYes?: string;
  buttonCancel?: string;
  currentUser?: CurrentUserModel
}
