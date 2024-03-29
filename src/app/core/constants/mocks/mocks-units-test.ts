import {
  CurrentUserModel,
  LoginFormModel,
  StsTokenManagerModel,
  UserAuthModel,
  UserMetadataModel,
} from "@models/auth/current-user.model";
import { ComboModel } from "@models/masters/combo.model";
import { AttachmentModel } from "@models/shared/attachment.model";
import { ErrorModel } from "@models/shared/error.model";
import { CurrentFilterModel } from "@models/shared/filter.model";
import { CategoryModel } from "@models/configurations/category.model";
import { ClientModel } from "@models/configurations/client.model";
import { IngresoEgresoModel } from "@models/management/ingreso-egreso.model";
import { LendingModel } from "@models/management/lending.model";
import { buildCreateDate } from "@core/utilities/core.utilities";

export const mockTestLoginFormOne: LoginFormModel = {
  email: "string",
  password: "string",
};

export const mockTestUserMetadataOne: UserMetadataModel = {
  createdAt: "string",
  creationTime: "string",
  lastLoginAt: "string",
  lastSignInTime: "string",
};

export const mockTestStsTokenManagerOne: StsTokenManagerModel = {
  accessToken: "string",
  expirationTime: "string",
  refreshToken: "string",
};

export const mockTestUserAuthOne: UserAuthModel = {
  accessToken: "string",
  displayName: "string",
  email: "string",
  emailVerified: false,
  metadata: mockTestUserMetadataOne,
  phoneNumber: "string",
  photoURL: "string",
  stsTokenManager: mockTestStsTokenManagerOne,
  uid: "string",
};

export const mockTestCurrentUserOne: CurrentUserModel = {
  ...mockTestUserAuthOne,
  currency: "string",
  dayStartDashboard: "01",
  numberOfDecimal: "2",
  systemDecimal: "comma",
  uploadPhoto: "string",
  officialRate: 35,
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

export const mockTestCurrentFilterOne: CurrentFilterModel = {
  rangeDate: { startDate: "2023-01-01", endDate: "2023-01-31" },
  wordFilter: "string",
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

export const mockTestClientOne: ClientModel = {
  id: "string",
  firstName: "string",
  lastName: "string",
  fullName: "string string",
  documentType: "string",
  documentNumber: "string",
  phoneNumber: "string",
  city: "string",
  address: "string",
  image: "string",
  state: true,
  stateText: "Activo",
  createDate: buildCreateDate().createDate,
  createDateFB: buildCreateDate().createDateFB,
};

export const mockTestClientAll: ClientModel[] = [
  {
    id: "string",
    firstName: "string",
    lastName: "string",
    fullName: "string string",
    documentType: "string",
    documentNumber: "string",
    phoneNumber: "string",
    city: "string",
    address: "string",
    image: "string",
    state: true,
    stateText: "Activo",
    createDate: buildCreateDate().createDate,
    createDateFB: buildCreateDate().createDateFB,
  },
];

export const mockTestIngresoEgresoOne: IngresoEgresoModel = {
  id: "string",
  idCategory: "string",
  category: "string",
  idTypeActive: "string",
  typeActive: "string",
  createDate: "string",
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

export const mockTestLendingOne: LendingModel = {
  id: "string",
  idClient: "string",
  client: "string",
  idTypeActive: "string",
  typeActive: "string",
  idStateSolvency: "string",
  stateSolvency: "string",
  amount: 100,
  description: "string",
  state: true,
  stateText: "Activa",
  createDate: buildCreateDate().createDate,
  createDateFB: buildCreateDate().createDateFB,
};

export const mockTestLendingAll: LendingModel[] = [
  {
    id: "string",
    idClient: "string",
    client: "string",
    idTypeActive: "string",
    typeActive: "string",
    idStateSolvency: "string",
    stateSolvency: "string",
    amount: 100,
    description: "string",
    state: true,
    stateText: "Activa",
    createDate: buildCreateDate().createDate,
    createDateFB: buildCreateDate().createDateFB,
  },
];
