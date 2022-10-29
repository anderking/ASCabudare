import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { doc, Firestore, onSnapshot } from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
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
    public afAuth: Auth,
    private afDB: Firestore,
    private _authFacadeService: AuthFacadeService
  ) {}

  /**
   * Cierra la sesion, borra el localStorage y borra el store
   */
  public logut(): void {
    this.userSubcription.unsubscribe();
    this._authFacadeService.reset();
    localStorage.clear();
    this.afAuth.signOut();
  }

  /**
   * Escucha los cambios del currentUser desde FireBase
   */
  public initAuthListener(): void {
    const currentUser: LoginResponseModel = this.getCurrentUserDecrypt();
    if (currentUser) {
      const subscription = new Observable((observer) => {
        const docRef = doc(this.afDB, `${currentUser.uid}/User`);
        return onSnapshot(
          docRef,
          (snapshot) => {
            observer.next(snapshot.data());
          },
          (error) => observer.error(error.message)
        );
      });
      subscription.subscribe((user: LoginResponseModel) => {
        this._authFacadeService.updateProfileFB(user);
        this._authFacadeService.setCurrentUser(user);
      });
    }
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
    return currentUser ? currentUser.accessToken : null;
  }
}
