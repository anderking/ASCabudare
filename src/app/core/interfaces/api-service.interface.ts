import { Observable } from 'rxjs';
import { DataActionModel } from '@models/common/data-action.model';

export interface ApiServiceInterface<T> {
    searchGetAll$(action: DataActionModel<T>): Observable<T[]>;
    searchGetOne$(action: DataActionModel<T>): Observable<T>;
    searchPostAll$(action: DataActionModel<T>): Observable<T[]>;
    searchPostOne$(action: DataActionModel<T>): Observable<T>;
    create$(action: DataActionModel<T>): Observable<T>;
    update$(action: DataActionModel<T>): Observable<T>;
    delete$(action: DataActionModel<T>): Observable<T>;
}