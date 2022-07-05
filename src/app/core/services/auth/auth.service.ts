import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import * as fireBase from "firebase";
import { map, tap, first, filter, last, take } from "rxjs/operators";
import { Subscription, Observable } from "rxjs";
import { authActions } from "@store/auth/actions";
import { UserModel } from "@models/auth/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: UserModel;
  public userSubcription: Subscription = new Subscription();
  public isUserAuth: boolean;
  public userListener: UserModel;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) {}

  //Cierra la sesion de un usuario
  logut() {
    this.afAuth.auth.signOut();
    this.userListener = null;
    this.userSubcription.unsubscribe();
    authActions.clear();
    this.router.navigate(["/login"]);
  }

  //Se encarga de escuchar si el usuario autentificado ha cambiado su estado
  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: fireBase.User) => {
      console.log(fbUser);
      if (fbUser) {
        this.userSubcription = this.afDB
          .doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((userFB: any) => {
            console.log(userFB);
            if (userFB) {
              const user: UserModel = {
                uid: userFB.uid,
                email: userFB.email,
                firstName: userFB.firstName,
                lastName: userFB.lastName,
              };
              authActions.setuser({ user });
            } else {
              this.logut();
            }
          });
      } else {
        this.logut();
      }
    });
  }

  //Verifica si hay un usuario autenticado para retornar el Guard
  isAuth() {
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        //console.log("Auth: ", fbUser)
        if (fbUser === null) {
          this.router.navigate(["/auth/login"]);
        } else {
          return true;
        }
      })
    );
  }
  //Verifica si hay un un usuario autenticado que intente accedeer al login o register para retornar el Guard
  isAuthRedirect() {
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        //console.log("Autenticated: ", fbUser)
        if (fbUser != null) {
          this.router.navigate(["/authenticated"]);
        } else {
          return true;
        }
      })
    );
  }
}
