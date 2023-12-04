import { Injectable, inject } from "@angular/core";
import {
  Auth,
  authState,
  getAuth,
  onAuthStateChanged,
} from "@angular/fire/auth";
import { doc, Firestore, onSnapshot } from "@angular/fire/firestore";
import { BehaviorSubject, Observable, Subscription, combineLatest } from "rxjs";
import {
  UserAuthModel,
  CurrentUserModel,
} from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import * as CryptoJS from "crypto-js";
import { environment } from "@environments/environment";
import {
  clearLocalStorage,
  getCurrentUserDecrypt,
} from "@root/core/utilities/core.utilities";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly _afAuth = inject(Auth);
  private readonly _afDB = inject(Firestore);
  private readonly _authFacadeService = inject(AuthFacadeService);

  public userSubcription: Subscription = new Subscription();
  public paramsToLoginTime = new BehaviorSubject<UserAuthModel>(null);

  /**
   * Setea el subject
   * @param {UserAuthModel} value es un boleano
   */
  set theParamsToLoginTime(value: UserAuthModel) {
    this.paramsToLoginTime.next(value);
  }

  /**
   * Cierra la sesion, borra el localStorage y borra el store
   */
  public logout(): void {
    this.userSubcription.unsubscribe();
    this._authFacadeService.reset();
    clearLocalStorage();
    this._afAuth.signOut();
  }

  /**
   * Escucha los cambios del currentUser desde FireBase
   */
  public initAuthListener(): void {
    const currentUser: UserAuthModel = this.getCurrentUserDecrypt();

    const userAuth$ = new Observable<UserAuthModel>((observer) => {
      const auth = getAuth();
      return onAuthStateChanged(
        auth,
        (user) => {
          const newUser = user as unknown as UserAuthModel;
          observer.next(newUser);
        },
        (error) => observer.error(error.message)
      );
    });

    const userDoc$ = new Observable<CurrentUserModel>((observer) => {
      const docRef = doc(this._afDB, `${currentUser?.uid}/User`);
      return onSnapshot(
        docRef,
        (snapshot) => {
          const userDoc = snapshot.data() as unknown as CurrentUserModel;
          userDoc as any as CurrentUserModel;
          observer.next(userDoc);
        },
        (error) => observer.error(error.message)
      );
    });

    const results$ = combineLatest([userAuth$, userDoc$]);
    results$
      .pipe(
        map(([userAuth, userDoc]) => {
          try {
            return {
              userAuth,
              userDoc,
            };
          } catch (error) {
            return {
              userAuth: null,
              userDoc: null,
            };
          }
        })
      )
      .subscribe((data) => {
        console.log("DATA", data);
        const userAuth = data.userAuth;
        let userDoc = data.userDoc;
        const currentUser = {
          displayName: userAuth?.displayName,
          email: userAuth?.email,
          emailVerified: userAuth?.emailVerified,
          phoneNumber: userDoc?.phoneNumber ? userDoc?.phoneNumber : "",
          currency: userDoc?.currency ? userDoc?.currency : "",
          dayStartDashboard: userDoc?.dayStartDashboard
            ? userDoc?.dayStartDashboard
            : "",
          numberOfDecimal: userDoc?.numberOfDecimal
            ? userDoc?.numberOfDecimal
            : "",
          systemDecimal: userDoc?.systemDecimal ? userDoc?.systemDecimal : "",
          photoURL: userDoc?.photoURL ? userDoc?.photoURL : "",
          uid: userAuth?.uid,
        };
        this._authFacadeService.setCurrentUser(currentUser);
      });
  }

  /**
   * Setea el currentUser en el localStorage de forma encriptada
   * @param currentUser Contiene el usuario actual en sesión
   */
  public setCurrentUserEncrypt(currentUser: UserAuthModel): void {
    const textToEncrypt = JSON.stringify(currentUser).trim();
    const cookieEncrypt = CryptoJS.AES.encrypt(textToEncrypt, environment.key);
    localStorage.setItem("currentUser", cookieEncrypt);
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/authenticated/home");
  }

  /**
   * Retorna el currentUser del localStorage y lo desencripta
   */
  private getCurrentUserDecrypt(): UserAuthModel {
    return getCurrentUserDecrypt();
  }

  /**
   * Retorna un boolean si el usuario esta autenticado y si no lo está cierra la sesion automaticamente
   */
  get isAuthenticate$() {
    return authState(this._afAuth);
  }

  /**
   * Retorna el token de sesion
   */
  public getToken(): string {
    const currentUser: UserAuthModel = this.getCurrentUserDecrypt();
    return currentUser ? currentUser.accessToken : null;
  }
}
