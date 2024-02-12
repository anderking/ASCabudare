import { Observable } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";
import { ResponseApiModel } from "@models/common/response-api.model";

export interface ApiServiceInterface<T> {
  searchGetAll$(action: DataActionModel<T>): Observable<ResponseApiModel<T[]>>;
  searchGetOne$(action: DataActionModel<T>): Observable<ResponseApiModel<T>>;
  searchPostAll$(action: DataActionModel<T>): Observable<ResponseApiModel<T[]>>;
  searchPostOne$(action: DataActionModel<T>): Observable<ResponseApiModel<T>>;
  create$(action: DataActionModel<T>): Observable<ResponseApiModel<T>>;
  update$(action: DataActionModel<T>): Observable<ResponseApiModel<T>>;
  delete$(action: DataActionModel<T>): Observable<ResponseApiModel<T>>;
  getToken$(expired: boolean): Observable<string>;
}
