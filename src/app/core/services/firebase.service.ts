import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";
import { environment } from "@environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, mergeMap, switchMap } from "rxjs/operators";
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
  createUserWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    let data: any = action.payload;

    const subscription = from(
      this.afAuth.auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          let user: any = {
            uid: response.user.uid,
            email: response.user.email,
            firstName: data.firstName,
          };

          this.afDB.doc(`${user.uid}/user`).set(user);
        })
    );

    return subscription.pipe(map((response: any) => response.user));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action
   */
  signInWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    let data: any = action.payload;

    const subscription = from(
      this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
    );

    return subscription.pipe(map((response: any) => response.user));
  }
}
