import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { take, tap } from "rxjs/operators";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
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
    tap((user) => {
      if (!user) {
        return true;
      } else {
        router.navigateByUrl("/authenticated");
      }
    })
  );
};

export const AuthVerifyEmailtGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((user) => {
      if (user && user.emailVerified) {
        return true;
      } else {
        router.navigateByUrl("/pages/verify-email");
      }
    })
  );
};

export const AuthVerifyEmailtRedirectGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((user) => {
      if (user && !user.emailVerified) {
        return true;
      } else {
        router.navigateByUrl("/authenticated");
      }
    })
  );
};

export const AuthTokenGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticate$.pipe(
    take(1),
    tap((user: any) => {
      if (user) {
        const tokenExpiration = user.stsTokenManager.expirationTime;
        const expirationDate = new Date(tokenExpiration);
        const currentDate = new Date();
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
  router.navigateByUrl("/auth");
}
