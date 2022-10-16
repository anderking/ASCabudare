import { ErrorModel } from "@models/shared/error.model";
import { Observable } from "rxjs";

export interface SharedInterface<> {
  getMessage$(): Observable<string>;
  getError$(): Observable<ErrorModel>;
  getLoading$(): Observable<boolean>;
  reset(): void;
}
