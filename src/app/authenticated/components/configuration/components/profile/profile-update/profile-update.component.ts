import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import {
  combineLatest,
  of,
  Subject,
} from "rxjs";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { Location } from "@angular/common";
import {
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { LoginResponseModel } from "@models/auth/login.model";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styles: [],
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public mainForm: FormGroup;
  public dataForm: LoginResponseModel;
  public currentItem: LoginResponseModel;
  public isLoading: boolean;

  constructor(
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _fb: FormBuilder,
    private _authFacadeService: AuthFacadeService
  ) {
    this.mainForm = this.initForm();
  }

  ngOnInit() {
    this.chargeIndicatorManager();

    const item$ = this._authFacadeService.getCurrentUser$().pipe(
      filter((item: LoginResponseModel) => !isNullOrUndefinedEmpty(item)),
      takeUntil(this.finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([item$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([item, mainForm]) => {
          return {
            item,
            mainForm,
          };
        }),
        takeUntil(this.finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        if (data.item) {
          this.selectCurrentItem(data.item);
        }
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this.finisher$.next();
  }

  selectCurrentItem(item: LoginResponseModel): void {
    this.currentItem = item;
    this.mainForm.reset(item, { emitEvent: false });
  }

  initForm(): FormGroup {
    return this._fb.group({
      displayName: [""],
      phoneNumber: [""],
      currency: [""],
      photoURL: [""],
    });
  }

  onSubmit() {
    this.dataForm = { ...this.currentItem, ...this.mainForm.getRawValue() };
    console.log(this.mainForm.controls);
    if (this.mainForm.valid) {
      console.log(this.dataForm);
      this._authFacadeService.updateProfile(this.dataForm);
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
  }

  clean() {
    this.mainForm.reset();
  }

  goBack() {
    this._location.back();
  }

  private chargeIndicatorManager(): void {
    const isLoading$ = this._authFacadeService.getLoading$();

    const result$ = combineLatest([isLoading$]).pipe(
      map(([isLoading]) => isLoading),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
