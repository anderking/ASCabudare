import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  LoginResponseModel,
  RegisterFormModel,
} from "@models/auth/login.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";
import { filter, first } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;
  public dataForm: RegisterFormModel;
  public isLoading: boolean;

  constructor(
    private _authFacadeService: AuthFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

  ngOnInit() {
    this._sharedFacadeService.getLoading$().subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this._authFacadeService
      .getRegister$()
      .pipe(first((login) => !isNullOrUndefined(login)))
      .subscribe((login: LoginResponseModel) => {
        console.log("REGISTER RESPONSE", login);
        this._authFacadeService.setUserDoc(login);
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._authFacadeService.reset();
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.form.getRawValue() };
    console.log(this.dataForm);
    if (this.mainForm.form.valid) {
      this._authFacadeService.register(this.dataForm);
    }
  }
}
