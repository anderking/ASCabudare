import { Observable } from 'rxjs';

export interface FacadeInterface<T> {
    getAll$(): Observable<T[]>;
    getCurrentItem$(): Observable<T>;
    getLoading$(): Observable<boolean>;
    search(): void;
    create(payload: T): void;
    update(payload: T): void;
    delete(payload: T): void;
    select(payload: T | string): void;
    reset(): void;
    resetSelected(): void;
}
