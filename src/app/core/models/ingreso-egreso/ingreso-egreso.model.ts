export interface IngresoEgresoModel {
  id?: string;
  description: string;
  amount: number;
  typeActive: string;
  idTypeActive: string;
  idCategory: string;
  category: string;
  state: boolean;
  stateText?: string;
  createDate: string;
  createDateFB?: object;
}

export interface TimestampFirebase {
  seconds: number;
  nanoseconds: number;
}
