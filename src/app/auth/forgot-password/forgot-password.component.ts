import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  inject,
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

  private _authService = inject(AuthService);
  private _authFacadeService = inject(AuthFacadeService);
  private _finisher = new Subject<void>();

  public dataForm: LoginFormModel;
  public isLoading: boolean;
  public email: string;
  public password: string;

  ngOnInit() {
    this._authFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
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
      this._authFacadeService.forgotPassword(this.dataForm);
    }
  }
}
