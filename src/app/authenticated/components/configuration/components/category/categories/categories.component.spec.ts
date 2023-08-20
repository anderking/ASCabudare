import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
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

describe("CategoriesComponent", () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryFacadeService: CategoryFacadeService;
  let sharedFacadeService: SharedFacadeService;

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

  xit("should call search from categoryFacadeService", () => {
    const mySpy = spyOn(categoryFacadeService, "search").and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
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

  xit("should call reset from ngOnDestroy", () => {
    const mySpyCa = spyOn(categoryFacadeService, "reset").and.callThrough();
    const mySpySh = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpyCa).toHaveBeenCalled();
    expect(mySpySh).toHaveBeenCalled();
  });

  it("should call delete from categoryFacadeService from goDelete", () => {
    const data = mockTestCategoryOne;
    const mySpy = spyOn(categoryFacadeService, "delete");

    component.goDelete(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });
});
