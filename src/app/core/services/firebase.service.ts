import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";
import { environment } from "@environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { finalize, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ApiFirebaseServiceInterface } from "@interfaces/api-firebase-service.interface";
import { AngularFireStorage } from "@angular/fire/storage";
@Injectable({
  providedIn: "root",
})
export class FirebaseService<T> implements ApiFirebaseServiceInterface<T> {
  private url = environment.apiUrl;

  constructor(
    public afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  signInWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;

    const subscription = from(
      this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
    );

    return subscription.pipe(
      tap((x) => console.log(x)),
      map((response: any) => response.user)
    );
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  createUserWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;
    const subscription = from(
      this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
    );

    return subscription.pipe(map((response: any) => response.user));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  uploadAttachment$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;

    const filePath = Date.now() + "-" + data.name;
    const storageRef = this.storage.ref(filePath);
    const task$ = storageRef.put(data);

    const subscription = from(task$).pipe(
      switchMap(() => storageRef.getDownloadURL()),
      finalize(() => {})
    );

    return subscription.pipe(
      tap((x) => console.log("uploadAttachment", x)),
      map((response: any) => response)
    );
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  setUserDoc$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;
    const subscription = from(this.afDB.doc(action.url).set(data));
    return subscription.pipe(map(() => data));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  search$(action: DataActionModel<T>): Observable<T[]> {
    const subscription = from(
      this.afDB
        .collection(`${action.url}`)
        .snapshotChanges()
        .pipe(
          map((docData) => {
            return docData.map((data: any) => {
              return {
                ...data.payload.doc.data(),
              };
            });
          })
        )
    );
    return subscription.pipe(map((response: T[]) => response));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  searchCombo$(action: DataActionModel<T>): Observable<T[]> {
    const subscription = from(
      this.afDB
        .collection(`${action.url}`)
        .snapshotChanges()
        .pipe(
          map((docData) => {
            return docData.map((data: any) => {
              return {
                ...data.payload.doc.data(),
              };
            });
          })
        )
    );
    return subscription.pipe(
      map((items: T[]) => {
        return items.map((item: any) => {
          const newItem = {
            ...item,
            id: item.code,
          };
          return newItem;
        });
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  searchOne$(action: DataActionModel<T>): Observable<T> {
    const payload: any = action.payload;
    const subscription: any = from(
      this.afDB
        .collection(`${action.url}`)
        .doc(`${payload.id}`)
        .snapshotChanges()
        .pipe(
          map((docData) => {
            return docData.payload.data();
          })
        )
    );
    return subscription.pipe(map((response: T) => response));
  }

  /**
   * Servicio que se usa para comunicar la api back para save
   * @param action Contiene el body DataActionModel
   */
  create$(action: DataActionModel<T>): Observable<T> {
    console.log("create$", action);
    const payload: any = action.payload;
    const id: string = payload?.id || this.afDB.createId();
    const data: any = { ...payload, id };
    const subscription = from(
      new Promise(async (resolve, reject) => {
        try {
          const result = await this.afDB
            .collection(`${action.url}`)
            .doc(`${id}`)
            .set(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })
    );
    return subscription.pipe(map((response: any) => data));
  }

  /**
   * Servicio que se usa para comunicar la api back para delete
   * @param action Contiene el body DataActionModel
   */
  delete$(action: DataActionModel<T>): Observable<T> {
    const payload: any = action.payload;
    const subscription = from(
      this.afDB.collection(`${action.url}`).doc(`${payload.id}`).delete()
    );
    return subscription.pipe(map((response: any) => response));
  }

  getToken$(isExpired: boolean): Observable<string> {
    return of("token");
  }
}
