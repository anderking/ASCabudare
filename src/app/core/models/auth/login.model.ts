export interface LoginFormModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoURL: string;
  ma: string;
  uid: string;
  refreshToken: string;
}


export interface RegisterFormModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterResponseModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}