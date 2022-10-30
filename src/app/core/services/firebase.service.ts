import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";
import { environment } from "@environments/environment";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "@angular/fire/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  onSnapshot,
  setDoc,
} from "@angular/fire/firestore";
import { finalize, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ApiFirebaseServiceInterface } from "@interfaces/api-firebase-service.interface";
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from "@angular/fire/storage";
import { AuthService } from "@services/auth/auth.service";
@Injectable({
  providedIn: "root",
})
export class FirebaseService<T> implements ApiFirebaseServiceInterface<T> {
  private url = environment.apiUrl;

  constructor(
    public afAuth: Auth,
    private afDB: Firestore,
    private storage: Storage,
    private authService: AuthService
  ) {}

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  signInWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;

    const subscription = from(
      signInWithEmailAndPassword(this.afAuth, data.email, data.password)
    );

    return subscription.pipe(
      tap((x) => console.log("signInWithEmailAndPassword", x)),
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
      createUserWithEmailAndPassword(this.afAuth, data.email, data.password)
    );

    return subscription.pipe(
      tap((x) => console.log("createUserWithEmailAndPassword", x)),
      map((response: any) => response.user)
    );
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  uploadAttachment$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;

    const filePath = Date.now() + "-" + data.name;
    const storageRef = ref(this.storage, filePath);
    const task$ = uploadBytes(storageRef, data);
    const subscription = from(task$).pipe(
      switchMap(() => getDownloadURL(storageRef)),
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
    //console.log("setUserDoc$", action);
    const data: any = action.payload;
    const subscription = from(
      new Promise(async (resolve, reject) => {
        try {
          const docRef = doc(this.afDB, `${action.url}`);
          resolve(setDoc(docRef, data));
        } catch (error) {
          reject(error);
        }
      })
    );
    return subscription.pipe(map(() => data));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  updateProfile$(action: DataActionModel<T>): Observable<any> {
    //console.log("updateProfile$", action);
    const data: any = action.payload;
    const subscription = from(
      new Promise(async (resolve, reject) => {
        try {
          const docRef = doc(this.afDB, `${action.url}`);
          resolve(setDoc(docRef, data));
        } catch (error) {
          reject(error);
        }
      })
    );
    return subscription.pipe(map(() => data));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  updateProfileFB$(action: DataActionModel<T>): Observable<any> {
    //console.log("updateProfileFB$", action);
    const data: any = action.payload;
    const auth = getAuth();
    const subscription = from(
      new Promise(async (resolve, reject) => {
        try {
          const update = updateProfile(auth.currentUser, {
            displayName: data.displayName,
            photoURL: data.photoURL,
          });
          resolve(update);
        } catch (error) {
          reject(error);
        }
      })
    );
    return subscription.pipe(map(() => data));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  search$(action: DataActionModel<T>): Observable<T[]> {
    const subscription = new Observable((observer) => {
      const colRef = collection(this.afDB, `${action.url}`);
      return onSnapshot(
        colRef,
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push(doc.data());
          });
          observer.next(items);
        },
        (error) => observer.error(error.message)
      );
    });

    return subscription.pipe(map((response: T[]) => response));
  }

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  searchCombo$(action: DataActionModel<T>): Observable<T[]> {
    const subscription = new Observable((observer) => {
      const colRef = collection(this.afDB, `${action.url}`);
      return onSnapshot(
        colRef,
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push(doc.data());
          });
          observer.next(items);
        },
        (error) => observer.error(error.message)
      );
    });
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
    const id: string = payload?.id;

    const subscription = new Observable((observer) => {
      const docRef = doc(this.afDB, `${action.url}`, `${id}`);
      return onSnapshot(
        docRef,
        (snapshot) => {
          console.log(snapshot.data());
          observer.next(snapshot.data());
        },
        (error) => observer.error(error.message)
      );
    });
    return subscription.pipe(map((response: T) => response));
  }

  /**
   * Servicio que se usa para comunicar la api back para save
   * @param action Contiene el body DataActionModel
   */
  create$(action: DataActionModel<T>): Observable<T> {
    const payload: any = action.payload;
    let data = payload;
    let id: string = data.id;
    const subscription = from(
      new Promise(async (resolve, reject) => {
        try {
          if (!id) {
            const ref = collection(this.afDB, `${action.url}`);
            const add = await addDoc(ref, payload);
            const id = add.id;
            const docRef = doc(this.afDB, `${action.url}`, `${id}`);
            data = {
              ...payload,
              id,
            };
            resolve(await setDoc(docRef, data));
          } else {
            const docRef = doc(this.afDB, `${action.url}`, `${id}`);
            data = {
              ...payload,
              id,
            };
            resolve(await setDoc(docRef, data));
          }
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
    const id: string = payload?.id;
    const subscription = from(
      new Promise(async (resolve, reject) => {
        try {
          const docRef = doc(this.afDB, `${action.url}`, `${id}`);
          resolve(deleteDoc(docRef));
        } catch (error) {
          reject(error);
        }
      })
    );
    return subscription.pipe(map((response: any) => response));
  }

  getToken$(isExpired: boolean): Observable<string> {
    return of(this.authService.getToken());
  }
}
