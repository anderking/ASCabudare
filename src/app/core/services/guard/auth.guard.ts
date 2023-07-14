import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticate()) {
    return true;
  } else {
    router.navigateByUrl("/auth");
  }
};

export const AuthRedirectGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthRedirect()) {
    return true;
  } else {
    router.navigateByUrl("/authenticated");
  }
};

export const AuthVerifyEmailtGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isVerifyEmail()) {
    return true;
  } else {
    router.navigateByUrl("/pages/verify-email");
  }
};
