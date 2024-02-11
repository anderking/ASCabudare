import { Component, OnInit, OnDestroy, inject, Input } from "@angular/core";
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
import { combineLatest, of, Subject } from "rxjs";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { filter, map, takeUntil } from "rxjs/operators";
import { Location } from "@angular/common";
import {
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { CategoryModel } from "@models/configurations/category.model";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @Input() id?: string;

  private _categoryFacadeService = inject(CategoryFacadeService);
  private _sharedFacadeService = inject(SharedFacadeService);
  private _translateService = inject(TranslateService);
  private _fb = inject(UntypedFormBuilder);
  private _location = inject(Location);
  private _finisher$ = new Subject<void>();

  public mainForm: UntypedFormGroup;
  public dataForm: CategoryModel;
  public currentItem: CategoryModel;
  public isLoading: boolean;

  ngOnInit() {
    this.mainForm = this.initForm();
    this.chargeIndicatorManager();

    const items$ = this._categoryFacadeService.getAll$().pipe(
      filter((items: CategoryModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this._finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([items$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([items, mainForm]) => {
          try {
            return {
              item: items.find((item: CategoryModel) => item.id === this.id),
              mainForm,
            };
          } catch (error) {
            console.error(error);
            return {
              item: null,
              mainForm,
            };
          }
        }),
        takeUntil(this._finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        if (data.item) {
          this.selectCurrentItem(data.item);
        }
      });

    this._categoryFacadeService
      .getCurrentItem$()
      .pipe(
        filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)),
        takeUntil(this._finisher$)
      )
      .subscribe((currentItem) => {
        console.log("currentItem", currentItem);
        this.currentItem = currentItem;
      });

    this._sharedFacadeService
      .getMessage$()
      .pipe(filter((currentItem) => !isNullOrUndefinedEmpty(currentItem)))
      .subscribe(() => {
        if (!this.currentItem) {
          this.clean();
        }
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this._finisher$.next();
  }

  selectCurrentItem(item: CategoryModel): void {
    this.mainForm.reset(item, { emitEvent: false });
    this._categoryFacadeService.select(item);
  }

  initForm(): UntypedFormGroup {
    return this._fb.group({
      id: null,
      name: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.maxLength(700)]],
      state: [true],
    });
  }

  onSubmit() {
    this.dataForm = {
      ...this.mainForm.getRawValue(),
      stateText: this.mainForm.getRawValue().state ? "Activa" : "Inactiva",
    };
    if (this.mainForm.valid) {
      this._categoryFacadeService.create(this.dataForm);
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm, this._translateService);
  }

  clean() {
    this.mainForm.reset({ state: true });
  }

  goBack() {
    this._location.back();
  }

  chargeIndicatorManager(): void {
    const isLoadingCategory$ = this._categoryFacadeService.getLoading$();

    const result$ = combineLatest([isLoadingCategory$]).pipe(
      map(([isLoadingCategory]) => isLoadingCategory),
      takeUntil(this._finisher$)
    );

    result$.pipe(takeUntil(this._finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
