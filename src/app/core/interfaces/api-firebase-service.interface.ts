import { Observable } from 'rxjs';
import { DataActionModel } from '@models/common/data-action.model';

export interface ApiFirebaseServiceInterface<T> {
    signInWithEmailAndPassword$(action: DataActionModel<T>): Observable<any>;
    createUserWithEmailAndPassword$(action: DataActionModel<T>): Observable<any>;
    setUserDoc$(action: DataActionModel<T>): Observable<any>;
    search$(action: DataActionModel<T>): Observable<T[]>;
    searchCombo$(action: DataActionModel<T>): Observable<T[]>;
    create$(action: DataActionModel<T>): Observable<T>;
    delete$(action: DataActionModel<T>): Observable<T>;
}