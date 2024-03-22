export interface PayModel {
  id: string;
  displayName: string;
  documentType: string;
  documentNumber: string;
  phoneNumberArea: string;
  phoneNumber: string;
  reference: string;
  amount: number;
  currency: string;
  photoURL: string;
  state: boolean;
  stateText: string;
  idStateSolvency: string;
  stateSolvency: string;
  idPayType: string;
  payType: string;
  createDate: string;
  createDateFB?: object;
}
