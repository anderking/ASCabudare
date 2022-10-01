import { Component, OnInit } from "@angular/core";
import { filter, takeUntil, tap } from "rxjs/operators";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { CategoryModel } from "@models/configurations/category.model";
import { CategoryFacadeService } from "@facades/category-facade.service";

@Component({
  selector: "app-categorys",
  templateUrl: "./categorys.component.html",
  styleUrls: ["./categorys.component.scss"],
})
export class CategorysComponent implements OnInit {
  public isLoading: boolean;
  public items: CategoryModel[] = [];
  public wordFilter: string = "";
  private _finisher = new Subject<void>();

  constructor(
    private _categoryFacadeService: CategoryFacadeService,
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _router: Router
  ) {}

  ngOnInit() {
    this._categoryFacadeService.search();
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
        tap((items: CategoryModel[]) => console.log(items)),
        takeUntil(this._finisher)
      )
      .subscribe((items: CategoryModel[]) => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
    this._finisher.next();
    this._categoryFacadeService.reset();
    this._sharedFacadeService.reset();
  }

  goDelete(item: CategoryModel): void {
    this._categoryFacadeService.delete(item);
  }

  goNew(): void {
    this._router.navigate(["/authenticated/configuration/category/form"]);
  }
  goEdit(item: CategoryModel): void {
    this._router.navigate([
      "/authenticated/configuration/category/form",
      { id: item?.id },
    ]);
  }
  goBack(): void {
    this._location.back();
  }
}
