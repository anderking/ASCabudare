import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as fireBase from "firebase";
import { Subscription } from "rxjs";
import * as authActions from "@store/auth/actions/auth.actions";
import { LoginResponseModel } from "@models/auth/login.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import * as CryptoJS from "crypto-js";
import { environment } from "@environments/environment";

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
    this.afAuth.auth.signOut();
    this.userSubcription.unsubscribe();
    localStorage.clear();
    authActions.clear();
    let actualRoute = window.location.origin;
    window.location.replace(actualRoute);
  }

  /**
   * Escucha los cambios del currentUser desde FireBase
   */
  public initAuthListener(): void {
    this.afAuth.authState.subscribe((fbUser: fireBase.User) => {
      console.log("fbUser", fbUser);
      if (fbUser) {
        this.userSubcription = this.afDB
          .doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((userFB: any) => {
            console.log("userFB", userFB);
            if (userFB) {
              let currentUser: LoginResponseModel = {
                displayName: userFB.displayName,
                email: userFB.email,
                emailVerified: userFB.emailVerified,
                phoneNumber: userFB.phoneNumber,
                photoURL: userFB.photoURL,
                ma: userFB.ma,
                uid: userFB.uid,
                refreshToken: userFB.refreshToken,
              };
              console.log("setCurrentUser", currentUser);
              this._authFacadeService.setCurrentUser(currentUser);
            }
          });
      }
    });
  }

  /**
   *Setea el currentUser en el localStorage de forma encriptada
   * @param currentUser
   */
  public setCurrentUserEncrypt(currentUser: LoginResponseModel): void {
    let textToEncrypt = JSON.stringify(currentUser).trim();
    var cookieEncrypt = CryptoJS.AES.encrypt(textToEncrypt, environment.key);
    localStorage.setItem("currentUser", cookieEncrypt);
    let actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/authenticated/home");
  }

  /**
   * Retorna el currentUser del localStorage y lo desencripta
   * @returns {LoginResponseModel}
   */
  private getCurrentUserDecrypt(): LoginResponseModel {
    try {
      let getCookieEncrypt = localStorage.getItem("currentUser");
      let textDecrypt = CryptoJS.AES.decrypt(getCookieEncrypt, environment.key);
      let currentUserDecript = textDecrypt.toString(CryptoJS.enc.Utf8);
      if (currentUserDecript) {
        let decryptedData = JSON.parse(currentUserDecript);
        return decryptedData;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }

  /**
   * Retorna un boolean si el usuario esta autenticado y si no lo está cierra la sesion automaticamente
   * @returns {boolean}
   */
  public isAuthenticate(): boolean {
    let currentUser: LoginResponseModel = this.getCurrentUserDecrypt();
    console.log(currentUser);
    if (currentUser != null) {
      return true;
    } else {
      this.logut();
      return false;
    }
  }
  /**
   * Verifica si hay un un usuario autenticado que intente accedeer al login o register para retornar el Guard
   * @returns {boolean}
   */
  public isAuthRedirect(): boolean {
    let currentUser: LoginResponseModel = this.getCurrentUserDecrypt();
    console.log(currentUser);
    if (currentUser == null) {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Retorna el token de sesion
   * @returns {string}
   */
  public getToken(): string {
    let currentUser: LoginResponseModel = this.getCurrentUserDecrypt();
    return currentUser ? currentUser.ma : null;
  }
}
