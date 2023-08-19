import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  CurrentUserModel,
  LoginFormModel,
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
  public dataForm: LoginFormModel;
  public isLoading: boolean;
  public email: string;
  public password: string;
  public registerFB: CurrentUserModel;
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
      .getRegister$()
      .pipe(
        first((register) => !isNullOrUndefined(register)),
        takeUntil(this._finisher)
      )
      .subscribe((register: CurrentUserModel) => {
        this.registerFB = register;
        const userDoc: CurrentUserModel = {
          displayName: register.displayName,
          email: register.email,
          emailVerified: register.emailVerified,
          phoneNumber: register.phoneNumber,
          currency: "",
          dayStartDashboard: "",
          numberOfDecimal: "",
          systemDecimal: "",
          photoURL: register.photoURL,
          uid: register.uid,
        };
        this._authFacadeService.setUserDoc(userDoc);
      });

    this._authFacadeService
      .getUserDoc$()
      .pipe(
        first((userDoc) => !isNullOrUndefined(userDoc)),
        takeUntil(this._finisher)
      )
      .subscribe(() => {
        this._router.navigate(["/login-time"]);
        this._authService.theParamsToLoginTime = this.registerFB;
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
