import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  inject,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  CurrentUserModel,
  LoginFormModel,
  UserAuthModel,
} from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";
import { first, takeUntil } from "rxjs/operators";
import { AuthService } from "@services/auth/auth.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;

  private _authService = inject(AuthService);
  private _authFacadeService = inject(AuthFacadeService);
  private _finisher = new Subject<void>();

  public dataForm: LoginFormModel;
  public isLoading: boolean;
  public email: string;
  public password: string;
  public registerFB: CurrentUserModel;

  ngOnInit() {
    this._authFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._authFacadeService
      .getUserAuth$()
      .pipe(
        first((userAuth) => !isNullOrUndefined(userAuth)),
        takeUntil(this._finisher)
      )
      .subscribe((userAuth: UserAuthModel) => {
        this._authService.theParamsToLoginTime = userAuth;
      });
  }

  ngAfterViewInit(): void {
    this._authService.logout();
  }

  ngOnDestroy() {
    this._authFacadeService.reset();
    this._finisher.next();
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.form.getRawValue() };
    if (this.mainForm.form.valid) {
      this._authFacadeService.register(this.dataForm);
    }
  }
}
