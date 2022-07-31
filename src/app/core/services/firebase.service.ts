import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";
import { environment } from "@environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
import * as fireBase from "firebase";

@Injectable({
  providedIn: "root",
})
export class FirebaseService<T> {
  private url = environment.apiUrl;

  constructor(public afAuth: AngularFireAuth, private afDB: AngularFirestore) {}

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action
   */
  signInWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    //console.log("signInWithEmailAndPassword", action);
    let data: any = action.payload;

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
   * @param action
   */
  createUserWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    //console.log("createUserWithEmailAndPassword", action);
    let data: any = action.payload;
    const subscription = from(
      this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
    );

    return subscription.pipe(map((response: any) => response.user));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action
   */
  setUserDoc$(action: DataActionModel<T>): Observable<any> {
    //console.log("setUserDoc", action);
    let data: any = action.payload;
    const subscription = from(this.afDB.doc(action.url).set(data));
    return subscription.pipe(map(() => "OK"));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action
   */
  search$(action: DataActionModel<T>): Observable<T[]> {
    //console.log("search$", action);
    const subscription = from(
      this.afDB
        .collection(`${action.url}`)
        .snapshotChanges()
        .pipe(
          map((docData) => {
            //console.log(docData)
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
   * Servicio que se usa para comunicar la api back para save
   * @param action
   */
  create$(action: DataActionModel<T>): Observable<T> {
    console.log("create$", action);
    const payload: any = action.payload;
    const id: string = payload?.id || this.afDB.createId();
    const data: any = { id, ...payload };
    const subscription = from(
      this.afDB.collection(`${action.url}`).doc(`${id}`).set({ data })
    );
    return subscription.pipe(map((response: any) => response));
  }

  /**
   * Servicio que se usa para comunicar la api back para delete
   * @param action
   */
  delete$(action: DataActionModel<T>): Observable<T> {
    console.log("delete$", action);
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
