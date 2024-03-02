export interface PayModel {
  id: string;
  displayName: string;
  dni: string;
  phoneNumberArea: string;
  phoneNumber: string;
  reference: string;
  amount: number;
  currency: string;
  photoURL: string;
  state: boolean;
  stateText: string;
  createDate: string;
  createDateFB?: object;
}
