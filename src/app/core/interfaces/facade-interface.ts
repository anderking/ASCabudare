import { Observable } from "rxjs";
export interface FacadeInterface<T> {
  search(): void;
  getAll$(): Observable<T[]>;
  searchOne(id: string): void;
  getOne$(): Observable<T>;
  select(payload: T | string): void;
  getCurrentItem$(): Observable<T>;
  create(payload: T): void;
  update(payload: T): void;
  delete(payload: T): void;
  resetSelected(): void;
  reset(): void;
  getLoading$(): Observable<boolean>;
}
