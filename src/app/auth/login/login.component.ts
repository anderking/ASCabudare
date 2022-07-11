import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { LoginFormModel, LoginResponseModel } from "@models/auth/login.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefined } from "@root/core/utilities/is-null-or-undefined.util";
import { filter, first, takeUntil } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;
  public dataForm: LoginFormModel;
  public isLoading: boolean;
  private _finisher = new Subject<void>();

  constructor(
    private _authFacadeService: AuthFacadeService,
    private _sharedFacadeService: SharedFacadeService
  ) {}

  ngOnInit() {
    this._sharedFacadeService.getLoading$().subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this._authFacadeService
      .getLogin$()
      .pipe(first((login) => !isNullOrUndefined(login)))
      .subscribe((login: LoginResponseModel) => {
        console.log("LOGIN RESPONSE", login);
        this._authFacadeService.setUserDoc(login);
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._authFacadeService.reset();
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.form.getRawValue() };
    if (this.mainForm.form.valid) {
      console.log("LOGIN", this.dataForm);
      this._authFacadeService.login(this.dataForm);
    }
  }
}
