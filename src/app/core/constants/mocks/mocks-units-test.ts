import {
  CurrentUserModel,
  LoginFormModel,
} from "@models/auth/current-user.model";
import { CategoryModel } from "@models/configurations/category.model";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { ComboModel } from "@models/masters/combo.model";
import { AttachmentModel } from "@models/shared/attachment.model";
import { ErrorModel } from "@models/shared/error.model";

export const mockTestLoginFormOne: LoginFormModel = {
  email: "string",
  password: "string",
};

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

export const mockTestAttachmentOne: AttachmentModel = {
  lastModified: 1,
  lastModifiedDate: new Date(),
  name: "string",
  size: 1,
  type: "string",
  webkitRelativePath: "string",
};

export const mockTestErrorOne: ErrorModel = {
  code: "string",
  message: "string",
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

export const mockTestCategoryOne: CategoryModel = {
  id: "string",
  name: "string",
  description: "string",
  state: true,
  stateText: "string",
};

export const mockTestCategoryAll: CategoryModel[] = [
  {
    id: "string",
    name: "string",
    description: "string",
    state: true,
    stateText: "string",
  },
];

export const mockTestIngresoEgresoOne: IngresoEgresoModel = {
  id: "string",
  description: "string",
  amount: 100,
  typeActive: "string",
  idTypeActive: "string",
  idCategory: "string",
  category: "string",
  state: true,
  stateText: "string",
  createDate: "string",
  createDateFB: "string",
};

export const mockTestIngresoEgresoAll: IngresoEgresoModel[] = [
  {
    id: "string",
    description: "string",
    amount: 100,
    typeActive: "string",
    idTypeActive: "string",
    idCategory: "string",
    category: "string",
    state: true,
    stateText: "string",
    createDate: "string",
    createDateFB: "string",
  },
];
