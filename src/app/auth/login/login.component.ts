import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";
import {
  LoginFormModel,
  CurrentUserModel,
} from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";
import { first, takeUntil } from "rxjs/operators";
import { AuthService } from "@services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;
  public dataForm: LoginFormModel;
  public isLoading: boolean;
  public email: string;
  public password: string;
  private _finisher = new Subject<void>();

  constructor(
    private _authService: AuthService,
    private _authFacadeService: AuthFacadeService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._authFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._authFacadeService
      .getLogin$()
      .pipe(
        first((login) => !isNullOrUndefined(login)),
        takeUntil(this._finisher)
      )
      .subscribe((login: CurrentUserModel) => {
        console.log("LOGIN RESPONSE", login);
        this._router.navigate(["/login-time"]);
        this._authService.theParamsToLoginTime = login;
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
      this._authFacadeService.login(this.dataForm);
    }
  }
}
