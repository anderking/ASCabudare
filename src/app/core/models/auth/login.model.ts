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
  uploadPhoto?: any | any[];
  ma: string;
  uid: string;
  refreshToken: string;
}
