import { Injectable } from "@angular/core";
import { CanLoad, Router, CanActivate } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthRedirectGuard implements CanLoad, CanActivate {
  private IsAuth: boolean;

  constructor(private _authService: AuthService, private _router: Router) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthRedirect()) {
      return true;
    } else {
      this._router.navigateByUrl("/authenticated");
    }
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthRedirect()) {
      return true;
    } else {
      this._router.navigateByUrl("/authenticated");
    }
  }
}
