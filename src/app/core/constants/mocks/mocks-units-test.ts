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
