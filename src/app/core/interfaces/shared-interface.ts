import { Observable } from "rxjs";

export interface SharedInterface<> {
  getMessages$(): Observable<string>;
  getError$(): Observable<string>;
  getLoading$(): Observable<boolean>;
  reset(): void;
}
