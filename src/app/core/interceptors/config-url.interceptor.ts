import { Injectable, Inject } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "@environments/environment";
import { catchError, mergeMap, tap } from "rxjs/operators";

@Injectable()
export class ConfiUriInterceptor<T> implements HttpInterceptor {
  constructor(@Inject("FirebaseService") private _firebaseService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request)
    if (request.url.indexOf(environment.apiUrl) > -1) {
      return this.getTokenConfig(false, next, request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 403) {
            return this.getTokenConfig(true, next, request);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }

  private getTokenConfig(
    isExpired: boolean,
    next: HttpHandler,
    request: HttpRequest<any>
  ): Observable<HttpEvent<any>> {
    return this._firebaseService
      .getToken$(isExpired)
      .pipe(
        mergeMap((token: string) =>
          next.handle(this.addAuthenticationToken(token, request))
        )
      );
  }
  private addAuthenticationToken(
    token: string,
    request: HttpRequest<any>
  ): HttpRequest<any> {
    const headers: { [name: string]: string | string[] } = {
      ["Content-Type"]: "application/json;odata=nometadata",
      ["Accept"]: "application/json;odata=nometadata",
    };
    let url = `${request.url}`;
    if (
      request.method === "GET" ||
      request.method === "POST" ||
      request.method === "PUT" ||
      request.method === "DELETE"
    ) {
      url = `${request.url}`;
    }
    return request.clone({
      url,
      setHeaders: headers,
    });
  }
}
