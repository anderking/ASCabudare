import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { DataActionModel } from "@models/common/data-action.model";
import { environment } from "@environments/environment";
import { ApiServiceInterface } from "@interfaces/api-service.interface";
import { ResponseApiModel } from "@models/common/response-api.model";

@Injectable({
  providedIn: "root",
})
export class ApiService<T> implements ApiServiceInterface<T> {
  private url = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  searchGetAll$(action: DataActionModel<T>): Observable<ResponseApiModel<T[]>> {
    const endPoint = this.url + action.url;
    return this._http.get<ResponseApiModel<T[]>>(endPoint).pipe(
      map((data) => {
        if (data.isSuccess) {
          return data;
        } else {
          throw new Error(data.message);
        }
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back y obtener un solo registro
   * @param action Contiene el body DataActionModel
   */
  searchGetOne$(action: DataActionModel<T>): Observable<ResponseApiModel<T>> {
    const endPoint = this.url + action.url;
    return this._http.get<ResponseApiModel<T>>(endPoint).pipe(
      map((data) => {
        if (data.isSuccess) {
          return data;
        } else {
          throw new Error(data.message);
        }
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back y obtener resultados que necesitan un body
   * @param action Contiene el body DataActionModel
   */
  searchPostAll$(
    action: DataActionModel<T>
  ): Observable<ResponseApiModel<T[]>> {
    const endPoint = this.url + action.url;
    return this._http
      .post<ResponseApiModel<T[]>>(endPoint, action.payload)
      .pipe(
        map((data) => {
          if (data.isSuccess) {
            return data;
          } else {
            throw new Error(data.message);
          }
        })
      );
  }

  /**
   * Servicio que se usa para comunicar la api back y obtener resultados que necesitan un body
   * @param action Contiene el body DataActionModel
   */
  searchPostOne$(action: DataActionModel<T>): Observable<ResponseApiModel<T>> {
    const endPoint = this.url + action.url;
    return this._http.post<ResponseApiModel<T>>(endPoint, action.payload).pipe(
      map((data) => {
        if (data.isSuccess) {
          return data;
        } else {
          throw new Error(data.message);
        }
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back para save
   * @param action Contiene el body DataActionModel
   */
  create$(action: DataActionModel<T>): Observable<ResponseApiModel<T>> {
    const endPoint = this.url + action.url;
    return this._http.post<ResponseApiModel<T>>(endPoint, action.payload).pipe(
      map((data) => {
        if (data.isSuccess) {
          return data;
        } else {
          throw new Error(data.message);
        }
      })
    );
  }

  /**
   * * Servicio que se usa para comunicar la api back para update
   * @param action Contiene el body DataActionModel
   */
  update$(action: DataActionModel<T>): Observable<ResponseApiModel<T>> {
    const endPoint = this.url + action.url;
    return this._http.put<ResponseApiModel<T>>(endPoint, action.payload).pipe(
      map((data) => {
        if (data.isSuccess) {
          return data;
        } else {
          throw new Error(data.message);
        }
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back para delete
   * @param action Contiene el body DataActionModel
   */
  delete$(action: DataActionModel<T>): Observable<ResponseApiModel<T>> {
    const endPoint = `${this.url}${action.url}`;
    return this._http.delete<ResponseApiModel<T>>(endPoint).pipe(
      map((data) => {
        if (data.isSuccess) {
          return data;
        } else {
          throw new Error(data.message);
        }
      })
    );
  }

  getToken$(isExpired: boolean): Observable<string> {
    return of("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1bmlxdWVfbmFtZSI6ImFkbWluIiwianRpIjoiNTAwMzU3ZWUtNDZlZS00ODY1LWE1ZTUtY2YzYzkzOWI0MmJlIiwiaWF0IjoiMGI5YjI0YzQtMmYxYS00ZDI3LWFlNzctZGM4YmRjMjI4NWI5IiwibmJmIjoxNzA3NjY4NzU5LCJleHAiOjE3MDc2OTc1NTksImlzcyI6Imh0dHBzOi8vc2lydGVjaC5jb20ucGUvIiwiYXVkIjoiaHR0cHM6Ly9zaXJ0ZWNoLmNvbS5wZS8ifQ.sNMxEO8xrMXPRO7DHAFt_LZQEuwtTNz_gIiy4aRFmlo");
  }
}
