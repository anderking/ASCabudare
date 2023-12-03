export interface LoginFormModel {
  email: string;
  password: string;
}
export interface UserAuthModel {
  accessToken?: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  metadata?: UserMetadataModel;
  phoneNumber: string;
  photoURL: string;
  stsTokenManager?: StsTokenManagerModel;
  uid: string;
}

export interface CurrentUserModel extends UserAuthModel {
  currency?: string;
  dayStartDashboard?: string;
  numberOfDecimal?: string;
  systemDecimal?: string;
  uploadPhoto?: any;
}
export interface UserMetadataModel {
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string;
}
export interface StsTokenManagerModel {
  accessToken: string;
  expirationTime: string;
  refreshToken: string;
}
