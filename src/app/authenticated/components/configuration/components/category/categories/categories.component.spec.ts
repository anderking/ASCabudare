import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { CategoriesComponent } from "./categories.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCategoryAll,
  mockTestCategoryOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../category-routing.module";
import { ModalService } from "@services/ui/modal.service";
import { Router } from "@angular/router";
import { ModalModel } from "@models/shared/modal.model";
import { CategoryModel } from "@models/configurations/category.model";

describe("CategoriesComponent", () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryFacadeService: CategoryFacadeService;
  let sharedFacadeService: SharedFacadeService;
  let modalService: ModalService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        SharedModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [CategoriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    categoryFacadeService = TestBed.inject(CategoryFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    modalService = TestBed.inject(ModalService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should to equal title component", () => {
    const html: HTMLElement = fixture.nativeElement;
    const h2 = html.querySelector("h2");

    expect(h2.textContent).toEqual("TITLES.CATEGORY");
  });

  it("should call getAll$ from categoryFacadeService", () => {
    const mySpy = spyOn(categoryFacadeService, "getAll$").and.returnValue(
      of(mockTestCategoryAll)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getLoading$ from categoryFacadeService", () => {
    const mySpy = spyOn(categoryFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call reset from ngOnDestroy", () => {
    const mySpySh = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpySh).toHaveBeenCalled();
  });

  it("should call navigate from router", fakeAsync(() => {
    const mySpy = spyOn(router, "navigate").and.callThrough();

    component.goNew();
    tick(0);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/configuration/category/form",
    ]);
  }));

  it("should call navigate from router", fakeAsync(() => {
    const mySpy = spyOn(router, "navigate").and.callThrough();

    component.goEdit(mockTestCategoryOne);
    tick(0);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/configuration/category/form",
      { id: mockTestCategoryOne.id },
    ]);
  }));

  it("should call delete from categoryFacadeService from goDelete", () => {
    const data = mockTestCategoryOne;
    const mySpy = spyOn(categoryFacadeService, "delete");

    component.goDelete(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call openModal from modalService", () => {
    const mySpy = spyOn(modalService, "openModal").and.returnValue(
      Promise.resolve({} as CategoryModel)
    );

    const mockTestModalOne: ModalModel<CategoryModel> = {
      type: "confirmation",
      item: mockTestCategoryOne,
      title: "TITLES.CONFIRMATION",
      message: "TEXTS.CONFIRMATION",
      buttonYes: "BUTTONS.YES",
      buttonCancel: "BUTTONS.CANCEL",
    };

    component.openModal(mockTestCategoryOne);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith(mockTestModalOne);
  });
});
