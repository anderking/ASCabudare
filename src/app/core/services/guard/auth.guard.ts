import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard  {
  constructor(private _authService: AuthService, private _router: Router) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticate()) {
      return true;
    } else {
      this._router.navigateByUrl("/auth");
    }
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticate()) {
      return true;
    } else {
      this._router.navigateByUrl("/auth");
    }
  }
}
