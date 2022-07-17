import { Injectable, OnInit } from "@angular/core";
import { CanLoad, Router, CanActivate } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthRedirectGuard implements OnInit, CanLoad, CanActivate {
  private IsAuth: boolean;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

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
