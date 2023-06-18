import {
  CurrentUserModel,
  LoginFormModel,
} from "@models/auth/current-user.model";
import { CategoryModel } from "@models/configurations/category.model";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { ComboModel } from "@models/masters/combo.model";
import { AttachmentModel } from "@models/shared/attachment.model";
import { ErrorModel } from "@models/shared/error.model";
import { CurrentFilterModel } from "@models/shared/filter.model";

export const mockTestLoginFormOne: LoginFormModel = {
  email: "string",
  password: "string",
};

export const mockTestCurrentUserOne: CurrentUserModel = {
  displayName: "string",
  email: "string@company.com",
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
  stateText: "Activa",
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
  idCategory: "string",
  category: "string",
  idTypeActive: "string",
  typeActive: "string",
  createDate: 'string',
  amount: 100,
  description: "string",
  state: true,
  stateText: "Activa",
};

export const mockTestIngresoEgresoAll: IngresoEgresoModel[] = [
  {
    id: "string",
    idCategory: "string",
    category: "string",
    idTypeActive: "string",
    typeActive: "string",
    createDate: new Date().toLocaleDateString("en-CA"),
    amount: 100,
    description: "string",
    state: true,
    createDateFB: new Date(
      new Date().toLocaleDateString("en-CA") +
        "T" +
        new Date().toISOString().split("T")[1]
    ),
    stateText: "Activa",
  },
];

export const mockTestCurrentFilterOne: CurrentFilterModel = {
  rangeDate: { startDate: "string", endDate: "string" },
  wordFilter: "string",
};
