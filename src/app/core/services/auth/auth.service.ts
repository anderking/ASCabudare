import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as fireBase from "firebase";
import { Subscription } from "rxjs";
import { LoginResponseModel } from "@models/auth/login.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import * as CryptoJS from "crypto-js";
import { environment } from "@environments/environment";
import { getCurrentUserDecrypt } from "@root/core/utilities/core.utilities";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userSubcription: Subscription = new Subscription();

  constructor(
    public afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private _authFacadeService: AuthFacadeService
  ) {}

  /**
   * Cierra la sesion, borra el localStorage y borra el store
   */
  public logut(): void {
    this.userSubcription.unsubscribe();
    this._authFacadeService.reset();
    localStorage.clear();
    this.afAuth.auth.signOut();
  }

  /**
   * Escucha los cambios del currentUser desde FireBase
   */
  public initAuthListener(): void {
    this.afAuth.authState.subscribe((fbUser: fireBase.User) => {
      // console.log("fbUser", fbUser);
      if (fbUser) {
        this.userSubcription = this.afDB
          .doc(`${fbUser.uid}/User`)
          .valueChanges()
          .subscribe((userFB: any) => {
            // console.log("userFB", userFB);
            if (userFB) {
              const currentUser: LoginResponseModel = {
                displayName: userFB.displayName,
                email: userFB.email,
                emailVerified: userFB.emailVerified,
                phoneNumber: userFB.phoneNumber,
                currency: userFB.currency,
                photoURL: userFB.photoURL,
                ma: userFB.ma,
                uid: userFB.uid,
                refreshToken: userFB.refreshToken,
              };
              this._authFacadeService.setCurrentUser(currentUser);
            }
          });
      }
    });
  }

  /**
   * Setea el currentUser en el localStorage de forma encriptada
   * @param currentUser Contiene el usuario actual en sesión
   */
  public setCurrentUserEncrypt(currentUser: LoginResponseModel): void {
    const textToEncrypt = JSON.stringify(currentUser).trim();
    const cookieEncrypt = CryptoJS.AES.encrypt(textToEncrypt, environment.key);
    localStorage.setItem("currentUser", cookieEncrypt);
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/authenticated/home");
  }

  /**
   * Retorna el currentUser del localStorage y lo desencripta
   */
  private getCurrentUserDecrypt(): LoginResponseModel {
    return getCurrentUserDecrypt();
  }

  /**
   * Retorna un boolean si el usuario esta autenticado y si no lo está cierra la sesion automaticamente
   */
  public isAuthenticate(): boolean {
    const currentUser: LoginResponseModel = this.getCurrentUserDecrypt();
    // console.log(currentUser);
    if (currentUser != null) {
      return true;
    } else {
      this.logut();
      return false;
    }
  }
  /**
   * Verifica si hay un un usuario autenticado que intente accedeer al login o register para retornar el Guard
   */
  public isAuthRedirect(): boolean {
    const currentUser: LoginResponseModel = this.getCurrentUserDecrypt();
    // console.log(currentUser);
    if (currentUser == null) {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Retorna el token de sesion
   */
  public getToken(): string {
    const currentUser: LoginResponseModel = this.getCurrentUserDecrypt();
    return currentUser ? currentUser.ma : null;
  }
}
