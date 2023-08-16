import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
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
import { finalize, map, switchMap, tap } from "rxjs/operators";
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
  constructor(
    public afAuth: Auth,
    private afDB: Firestore,
    private storage: Storage,
    private authService: AuthService
  ) {}

  /**
   * Servicio para autenticar un usuario por email y password
   * @param action Contiene el body DataActionModel
   */
  signInWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;

    const subscription = from(
      signInWithEmailAndPassword(this.afAuth, data.email, data.password)
    );

    return subscription.pipe(
      map((response: any) => response.user)
    );
  }

  /**
   * Servicio para crear un usuario con email y password
   * @param action Contiene el body DataActionModel
   */
  createUserWithEmailAndPassword$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;
    const subscription = from(
      createUserWithEmailAndPassword(this.afAuth, data.email, data.password)
    );

    return subscription.pipe(
      map((response: any) => response.user)
    );
  }

  /**
   * Servicio para enviar correo de verificación
   */
  sendEmailVerification$(): Observable<any> {
    const auth = getAuth();
    const subscription = from(sendEmailVerification(auth.currentUser));
    return subscription.pipe(
      map(
        () =>
          "Email enviado, recuerde revisar su bandeja de entrada, correos no deseado o spam."
      )
    );
  }

  /**
   * Servicio para recuperar el password de un usuario
   * @param action Contiene el body DataActionModel
   */
  sendPasswordResetEmail$(action: DataActionModel<T>): Observable<any> {
    const data: any = action.payload;
    const auth = getAuth();
    const subscription = from(sendPasswordResetEmail(auth, data.email));
    return subscription.pipe(
      map(
        () =>
          "Email enviado, recuerde revisar su bandeja de entrada, correos no deseado o spam."
      )
    );
  }

  /**
   * Servicio para setear los datos del usuario
   * @param action Contiene el body DataActionModel
   */
  setUserDoc$(action: DataActionModel<T>): Observable<any> {
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
   * Servicio para actualizar el perfil del usuario en autenticación
   * @param action Contiene el body DataActionModel
   */
  updateProfileFB$(action: DataActionModel<T>): Observable<any> {
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

    return subscription.pipe(
      map((response: any) => response)
    );
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
   * Servicio para eliminar registros
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
