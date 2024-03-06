import { Injectable } from "@angular/core";
import { from, Observable, of, Subscriber } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
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
import { finalize, map, switchMap } from "rxjs/operators";
import { ApiFirebaseServiceInterface } from "@interfaces/api-firebase-service.interface";
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from "@angular/fire/storage";
import { AuthService } from "@services/auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { UserAuthModel } from "@models/auth/current-user.model";

@Injectable({
  providedIn: "root",
})
export class FirebaseService<T> implements ApiFirebaseServiceInterface<T> {
  constructor(
    public afAuth: Auth,
    private afDB: Firestore,
    private storage: Storage,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  /**
   * Servicio para autenticar con google
   * @param action Contiene el body DataActionModel
   */
  signInGoogle(): Observable<UserAuthModel> {
    try {
      const subscription = from(
        signInWithPopup(this.afAuth, new GoogleAuthProvider())
      );
      return subscription.pipe(
        map((response) => response.user as unknown as UserAuthModel)
      );
    } catch (error) {
      console.log("Google login", error);
    }
  }

  /**
   * Servicio para autenticar un usuario por email y password
   * @param action Contiene el body DataActionModel
   */
  signInWithEmailAndPassword$(
    action: DataActionModel<T>
  ): Observable<UserAuthModel> {
    const data: any = action.payload;

    const subscription = from(
      signInWithEmailAndPassword(this.afAuth, data.email, data.password)
    );

    return subscription.pipe(
      map((response: any) => response.user as unknown as UserAuthModel)
    );
  }

  /**
   * Servicio para crear un usuario con email y password
   * @param action Contiene el body DataActionModel
   */
  createUserWithEmailAndPassword$(
    action: DataActionModel<T>
  ): Observable<UserAuthModel> {
    const data: any = action.payload;
    const subscription = from(
      createUserWithEmailAndPassword(this.afAuth, data.email, data.password)
    );

    return subscription.pipe(
      map((response: any) => response.user as unknown as UserAuthModel)
    );
  }

  /**
   * Servicio para enviar correo de verificación
   */
  sendEmailVerification$(): Observable<any> {
    const auth = getAuth();
    const subscription = from(sendEmailVerification(auth.currentUser));
    const message = this.translateService.instant("MESSAGES.SEND_EMAIL");
    return subscription.pipe(map(() => message));
  }

  /**
   * Servicio para recuperar el password de un usuario
   * @param action Contiene el body DataActionModel
   */
  sendPasswordResetEmail$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;
    const auth = getAuth();
    const subscription = from(sendPasswordResetEmail(auth, data.email));
    const message = this.translateService.instant("MESSAGES.SEND_EMAIL");
    return subscription.pipe(map(() => message));
  }

  /**
   * Servicio para setear los datos del usuario personalizado
   * @param action Contiene el body DataActionModel
   */
  setUserDoc$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;
    try {
      const docRef = doc(this.afDB, `${action.url}`);
      return from(setDoc(docRef, data)).pipe(map(() => data));
    } catch (error) {
      return new Observable((observer) => {
        observer.error(error);
      });
    }
  }

  /**
   * Servicio para actualizar el perfil del usuario en autenticación
   * @param action Contiene el body DataActionModel
   */
  updateProfileFB$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;
    const auth = getAuth();
    try {
      return from(
        updateProfile(auth.currentUser, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        })
      ).pipe(map(() => data));
    } catch (error) {
      return new Observable((observer) => {
        observer.error(error);
      });
    }
  }

  /**
   * Servicio para subir archivos
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

    return subscription.pipe(map((response: any) => response));
  }

  /**
   * Servicio para consultar registros
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
   * Servicio para consultar registros y mapear los datos
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
   * Servicio para obtener un registro
   * @param action Contiene el body DataActionModel
   */
  searchOne$(action: DataActionModel<T>): Observable<T> {
    const id: string = action?.id;

    const subscription = new Observable((observer) => {
      const docRef = doc(this.afDB, `${action.url}`, `${id}`);
      return onSnapshot(
        docRef,
        (snapshot) => {
          observer.next(snapshot.data());
        },
        (error) => observer.error(error.message)
      );
    });
    return subscription.pipe(map((response: T) => response));
  }

  /**
   * Servicio para crear o actualizar registros
   * @param action Contiene el body DataActionModel
   */
  create$(action: DataActionModel<T>): Observable<T> {
    const payload: any = action.payload;
    let data = payload;
    let id: string = data.id;
    const subscription = from(
      new Promise((resolve, reject) => {
        const asyncFunction = async () => {
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
        };
        asyncFunction();
      })
    );
    return subscription.pipe(map(() => data));
  }

  /**
   * Servicio para crear o actualizar registros con files
   * @param action Contiene el body DataActionModel
   */
  createWithFile$(action: DataActionModel<T>): Observable<T> {
    const payload: any = action.payload;
    let data = payload;
    let id: string = data.id;
    let photoURL = "";
    const subscription = from(
      new Promise((resolve, reject) => {
        const asyncFunction = async () => {
          try {
            if (action.currentFile) {
              const props: DataActionModel<any> = {
                url: "",
                payload: action.currentFile,
              };
              const observable = this.uploadAttachment$(props);
              photoURL = await observable.toPromise();
            } else {
              photoURL = payload.photoURL;
            }

            console.log(photoURL);

            if (!id) {
              const ref = collection(this.afDB, `${action.url}`);
              const add = await addDoc(ref, payload);
              const id = add.id;
              const docRef = doc(this.afDB, `${action.url}`, `${id}`);
              data = {
                ...payload,
                id,
                photoURL,
              };
              resolve(await setDoc(docRef, data));
            } else {
              const docRef = doc(this.afDB, `${action.url}`, `${id}`);
              data = {
                ...payload,
                id,
                photoURL,
              };
              resolve(await setDoc(docRef, data));
            }
          } catch (error) {
            reject(error);
          }
        };
        asyncFunction();
      })
    );
    return subscription.pipe(map(() => data));
  }

  /**
   * Servicio para eliminar registros
   * @param action Contiene el body DataActionModel
   */
  delete$(action: DataActionModel<T>): Observable<string | Subscriber<string>> {
    const payload: any = action.payload;
    const id: string = payload?.id;
    const docRef = doc(this.afDB, `${action.url}`, `${id}`);
    try {
      return from(deleteDoc(docRef)).pipe(map(() => id));
    } catch (error) {
      return new Observable((observer) => {
        observer.error(error);
      });
    }
  }

  getToken$(isExpired: boolean): Observable<string> {
    return of(this.authService.getToken());
  }
}
