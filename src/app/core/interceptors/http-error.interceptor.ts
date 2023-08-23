import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from "@angular/common/http";
import { throwError } from "rxjs";

import { catchError } from "rxjs/operators";
import { statusMessages } from "../utilities/status-messages";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = "";
        if (error instanceof ErrorEvent) {
          errorMessage = `Error del navegador: ${error.error.message}`;
        } else if (error.status === 200) {
          errorMessage = `${statusMessages(error.status, error.error.text)}`;
        } else {
          errorMessage = `Error del servidor: ${statusMessages(error.status)}`;
        }

        return throwError(() => errorMessage);
      })
    );
  }
}
