export interface LendingModel {
  id: string;
  description: string;
  amount: number;
  typeActive: string;
  idTypeActive: string;
  idClient: string;
  client: string;
  state: boolean;
  stateText?: string;
  createDate: string;
  createDateFB?: object;
}

export interface TimestampFirebase {
  seconds: number;
  nanoseconds: number;
}
