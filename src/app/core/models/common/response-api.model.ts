export interface ResponseApiModel<T> {
  isSuccess: boolean;
  data: T;
  totalRecords: number;
  message: string;
  errors: string;
}
