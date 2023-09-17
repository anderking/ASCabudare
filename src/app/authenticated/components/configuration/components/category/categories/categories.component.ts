import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, takeUntil } from "rxjs/operators";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { CategoryModel } from "@models/configurations/category.model";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { ModalService } from "@services/ui/modal.service";
import { TranslateService } from "@ngx-translate/core";
import { ModalModel } from "@models/shared/modal.model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  public items: CategoryModel[] = [];
  public wordFilter = "";
  public wordFilterActive = false;
  private _finisher = new Subject<void>();

  constructor(
    private _categoryFacadeService: CategoryFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _router: Router,
    private translateService: TranslateService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this._categoryFacadeService
      .getLoading$()
      .pipe(takeUntil(this._finisher))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this._categoryFacadeService
      .getAll$()
      .pipe(
        filter((items: CategoryModel[]) => !isNullOrUndefinedEmpty(items)),
        takeUntil(this._finisher)
      )
      .subscribe((items: CategoryModel[]) => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
    this._finisher.next();
    this._sharedFacadeService.reset();
  }

  wordFilterReceived(wordFilter: string): void {
    this.wordFilter = wordFilter;
  }

  goNew(): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate(["/authenticated/configuration/category/form"]);
    }, 0);
  }

  goEdit(item: CategoryModel): void {
    this.wordFilterActive = true;
    setTimeout(() => {
      this._router.navigate([
        "/authenticated/configuration/category/form",
        { id: item?.id },
      ]);
    }, 0);
  }

  goDelete(item: CategoryModel): void {
    this._categoryFacadeService.delete(item);
  }

  goBack(): void {
    this._location.back();
  }

  openModal(item: CategoryModel) {
    const data: ModalModel<CategoryModel> = {
      type: "confirmation",
      item,
      title: this.translateService.instant("TITLES.CONFIRMATION"),
      message: this.translateService.instant("TEXTS.CONFIRMATION"),
      buttonYes: this.translateService.instant("BUTTONS.YES"),
      buttonCancel: this.translateService.instant("BUTTONS.CANCEL"),
    };
    this.modalService
      .openModal(data)
      .then((data) => {
        this.goDelete(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
