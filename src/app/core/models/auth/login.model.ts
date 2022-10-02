export interface LoginFormModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  currency: string;
  photoURL: string;
  ma: string;
  uid: string;
  refreshToken: string;
}