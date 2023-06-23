import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { ActivatedRoute, ParamMap } from "@angular/router";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { CategoryModel } from "@models/configurations/category.model";
import { CategoryFacadeService } from "@facades/category-facade.service";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public mainForm: UntypedFormGroup;
  public dataForm: CategoryModel;
  public currentItem: CategoryModel;
  public isLoading: boolean;

  constructor(
    private _categoryFacadeService: CategoryFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _fb: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.mainForm = this.initForm();
  }

  ngOnInit() {
    this.chargeIndicatorManager();

    const params$ = this._activatedRoute.paramMap.pipe(
      filter((params) => !isNullOrUndefinedEmpty(params)),
      map((params: ParamMap) => {
        const id = params.get("id");
        return { id };
      }),
      takeUntil(this.finisher$)
    );

    const items$ = this._categoryFacadeService.getAll$().pipe(
      filter((items: CategoryModel[]) => !isNullOrUndefinedEmpty(items)),
      takeUntil(this.finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([items$, params$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([items, params, mainForm]) => {
          try {
            return {
              item: items.find((item: CategoryModel) => item.id === params.id),
              params,
              mainForm,
            };
          } catch (error) {
            console.error(error);
            return {
              item: null,
              params,
              mainForm,
            };
          }
        }),
        takeUntil(this.finisher$)
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
        takeUntil(this.finisher$)
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
    this.finisher$.next();
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
    return getErrorMessageField(field, this.mainForm);
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
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
