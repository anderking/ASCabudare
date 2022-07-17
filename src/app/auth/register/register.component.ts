import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  LoginResponseModel,
  RegisterFormModel,
} from "@models/auth/login.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";
import { filter, first, takeUntil } from "rxjs/operators";
import { AuthService } from "@services/auth/auth.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;
  public dataForm: RegisterFormModel;
  public isLoading: boolean;
  private _finisher = new Subject<void>();
  private _currentUser: LoginResponseModel

  constructor(
    private _authService: AuthService,
    private _authFacadeService: AuthFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

  ngOnInit() {
    this._sharedFacadeService
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
      .subscribe((register: LoginResponseModel) => {
        console.log("REGISTER RESPONSE", register);
        this._currentUser = register;
        this._authFacadeService.setUserDoc(register);
      });

    this._authFacadeService
      .getUserDoc$()
      .pipe(
        first((userDoc) => !isNullOrUndefined(userDoc)),
        takeUntil(this._finisher)
      )
      .subscribe((userDoc: string) => {
        console.log("USERDOC RESPONSE", userDoc);
        this._authService.setCurrentUserEncrypt(this._currentUser);
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._authFacadeService.reset();
    this._finisher.next();
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.form.getRawValue() };
    console.log(this.dataForm);
    if (this.mainForm.form.valid) {
      this._authFacadeService.register(this.dataForm);
    }
  }
}
