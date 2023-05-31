import {
  CurrentUserModel,
  LoginFormModel,
} from "@models/auth/current-user.model";
import { ComboModel } from "@models/masters/combo.model";
import { AttachmentModel } from "@models/shared/attachment.model";

export const mockTestCurrentUserOne: CurrentUserModel = {
  displayName: "string",
  email: "string",
  emailVerified: false,
  phoneNumber: "string",
  currency: "string",
  dayStartDashboard: "string",
  photoURL: "string",
  uploadPhoto: "string",
  accessToken: "string",
  uid: "string",
  refreshToken: "string",
};

export const mockTestLoginFormOne: LoginFormModel = {
  email: "string",
  password: "string",
};
export const mockTestComboOne: ComboModel = {
  id: "string",
  code: "string",
  name: "string",
  state: true,
};

export const mockTestComboAll: ComboModel[] = [
  {
    id: "string",
    code: "string",
    name: "string",
    state: true,
  },
];

export const mockTestAttachmentOne: AttachmentModel = {
  lastModified: 1,
  lastModifiedDate: new Date(),
  name: "string",
  size: 1,
  type: "string",
  webkitRelativePath: "string",
};
