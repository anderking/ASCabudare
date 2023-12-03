import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { take, tap } from "rxjs/operators";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((x) => console.log("AuthGuard", x)),
    tap((user) => {
      if (user) {
        return true;
      } else {
        logoutSesion(authService, router);
      }
    })
  );
};

export const AuthRedirectGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((x) => console.log("AuthRedirectGuard", x)),
    tap((user) => (!user ? true : router.navigateByUrl("/authenticated")))
  );
};

export const AuthVerifyEmailtGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((x) => console.log("AuthVerifyEmailtGuard", x)),
    tap((user) =>
      user && user.emailVerified
        ? true
        : router.navigateByUrl("/pages/verify-email")
    )
  );
};

export const AuthVerifyEmailtRedirectGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((x) => console.log("AuthVerifyEmailtRedirectGuard", x)),
    tap((user) =>
      user && !user.emailVerified
        ? true
        : router.navigateByUrl("/authenticated")
    )
  );
};

export const AuthTokenGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((x) => console.log("AuthTokenGuard", x)),
    tap((user: any) => {
      console.log(user);
      if (user) {
        const tokenExpiration = user.stsTokenManager.expirationTime;
        const expirationDate = new Date(tokenExpiration);
        const currentDate = new Date();
        console.log("expirationDate", expirationDate);
        console.log("currentDate", currentDate);
        if (expirationDate > currentDate) {
          return true;
        } else {
          logoutSesion(authService, router);
        }
      } else {
        logoutSesion(authService, router);
      }
    })
  );
};

function logoutSesion(authService: AuthService, router: Router) {
  authService.logout();
  const actualRoute = window.location.origin;
  window.location.replace(actualRoute + "/auth");
}
