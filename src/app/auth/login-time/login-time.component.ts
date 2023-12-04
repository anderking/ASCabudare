import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { AuthService } from "@services/auth/auth.service";
import { Subject, filter, takeUntil, tap } from "rxjs";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-time",
  template: "",
  styles: [],
})
export class LoginTimeComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _finisher = new Subject<void>();

  ngOnInit(): void {
    const params$ = this._authService.paramsToLoginTime.pipe(
      tap((params: CurrentUserModel) => {
        if (!params) {
          this._router.navigate(["/login"]);
        }
      }),
      filter((params: CurrentUserModel) => !isNullOrUndefined(params)),
      takeUntil(this._finisher)
    );

    params$.subscribe((params: CurrentUserModel) => {
      this._authService.setCurrentUserEncrypt(params);
    });
  }

  ngOnDestroy() {
    this._finisher.next();
  }
}
