export interface ClientModel {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  phoneNumber: string;
  city: string;
  adress: string;
  image: string;
  state: boolean;
  stateText: string;
  createDate: string;
  createDateFB?: object;
}
