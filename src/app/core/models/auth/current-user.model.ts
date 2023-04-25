export interface LoginFormModel {
  email: string;
  password: string;
}

export interface CurrentUserModel {
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  currency: string;
  dayStartDashboard: string;
  photoURL: string;
  uploadPhoto?: any | any[];
  accessToken?: string;
  uid: string;
  refreshToken?: string;
}
