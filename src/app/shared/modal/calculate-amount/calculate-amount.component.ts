import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { TranslateService } from "@ngx-translate/core";
import {
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { Subject, combineLatest } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-calculate-amount",
  templateUrl: "./calculate-amount.component.html",
})
export class CalculateAmountComponent implements OnInit, OnDestroy {
  @Input() officialRate: number;
  @Output() resultEmit: EventEmitter<number> = new EventEmitter<number>();

  private _authFacadeService = inject(AuthFacadeService);
  private _translateService = inject(TranslateService);
  private _fb = inject(UntypedFormBuilder);
  private _finisher$ = new Subject<void>();

  public currentUser: CurrentUserModel;
  public mainForm: UntypedFormGroup;
  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  public result: number = 0;

  ngOnInit() {
    this.mainForm = this.initForm();
    this.calculateResult();
    this.mainForm.get("officialRate").setValue(this.officialRate);

    this._authFacadeService
      .getCurrentUser$()
      .pipe(takeUntil(this._finisher$))
      .subscribe((user: CurrentUserModel) => {
        this.currentUser = user;
        this.numberOfDecimal = user?.numberOfDecimal
          ? user.numberOfDecimal
          : this.numberOfDecimal;
        this.systemDecimal = user?.systemDecimal
          ? user.systemDecimal
          : this.systemDecimal;
      });
  }

  ngOnDestroy() {
    this._finisher$.next();
  }

  initForm(): UntypedFormGroup {
    return this._fb.group({
      amount: ["", [Validators.required]],
      officialRate: ["", [Validators.required]],
      result: ["", [Validators.required]],
    });
  }

  private calculateResult(): void {
    const amount$ = this.mainForm
      .get("amount")
      .valueChanges.pipe(takeUntil(this._finisher$));

    const officialRate$ = this.mainForm
      .get("officialRate")
      .valueChanges.pipe(takeUntil(this._finisher$));

    const results$ = combineLatest([amount$, officialRate$]);

    results$
      .pipe(
        map(([amount, officialRate]) => {
          return {
            amount,
            officialRate,
          };
        }),
        takeUntil(this._finisher$)
      )
      .subscribe((data) => {
        if (data.officialRate > 0) {
          this.result = data.amount / data.officialRate;
        } else {
          this.result = 0;
        }
        this.mainForm.get("result").setValue(this.result);
      });
  }

  onSubmit() {
    this.resultEmit.emit(this.result);
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm, this._translateService);
  }
}
