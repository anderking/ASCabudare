import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";
import { LoginFormModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
})
export class ForgotPasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("mainForm", { read: NgForm }) mainForm: NgForm;
  public dataForm: LoginFormModel;
  public isLoading: boolean;
  public email: string;
  public password: string;
  private _finisher = new Subject<void>();

  constructor(
    private _authService: AuthService,
    private _authFacadeService: AuthFacadeService
  ) {}

  ngOnInit() {
    this._authFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  ngAfterViewInit(): void {
    this._authService.logut();
  }

  ngOnDestroy() {
    this._authFacadeService.reset();
    this._finisher.next();
  }

  onSubmit() {
    this.dataForm = { ...this.mainForm.form.getRawValue() };
    if (this.mainForm.form.valid) {
      console.log("LOGIN", this.dataForm);
      this._authFacadeService.forgotPassword(this.dataForm);
    }
  }
}
