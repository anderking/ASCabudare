import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { retry, map, tap, mergeMap } from "rxjs/operators";
import { DataActionModel } from "@models/common/data-action.model";
import { environment } from "@environments/environment";
import { ApiServiceInterface } from "@interfaces/api-service.interface";

@Injectable({
  providedIn: "root",
})
export class ApiService<T> implements ApiServiceInterface<T> {
  private url = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action
   */
  searchGetAll$(action: DataActionModel<T>): Observable<T[]> {
    const endPoint = this.url + action.url;
    return this._http.get<T[]>(endPoint).pipe(retry(3));
  }

  /**
   * Servicio que se usa para comunicar la api back y obtener un solo registro
   * @param action
   */
  searchGetOne$(action: DataActionModel<T>): Observable<T> {
    const endPoint = this.url + action.url;
    return this._http.get<T>(endPoint);
  }

  /**
   * Servicio que se usa para comunicar la api back y obtener resultados que necesitan un body
   * @param action
   */
  searchPostAll$(action: DataActionModel<T>): Observable<T[]> {
    const endPoint = this.url + action.url;
    return this._http.post<T[]>(endPoint, action.payload);
  }

  /**
   * Servicio que se usa para comunicar la api back y obtener resultados que necesitan un body
   * @param action
   */
  searchPostOne$(action: DataActionModel<T>): Observable<T> {
    const endPoint = this.url + action.url;
    return this._http.post<T>(endPoint, action.payload);
  }

  /**
   * Servicio que se usa para comunicar la api back para save
   * @param action
   */
  create$(action: DataActionModel<T>): Observable<T> {
    const endPoint = this.url + action.url;
    return this._http.post<T>(endPoint, action.payload);
  }

  /**
   * * Servicio que se usa para comunicar la api back para update
   * @param action
   */
  update$(action: DataActionModel<T>): Observable<T> {
    const endPoint = this.url + action.url;
    return this._http.put<T>(endPoint, action.payload);
  }

  /**
   * Servicio que se usa para comunicar la api back para delete
   * @param action
   */
  delete$(action: DataActionModel<T>): Observable<T> {
    const endPoint = `${this.url}${action.url}`;
    return this._http.delete<T>(endPoint);
  }

  getToken$(isExpired: boolean): Observable<string> {
    return of('token')
  }
}
