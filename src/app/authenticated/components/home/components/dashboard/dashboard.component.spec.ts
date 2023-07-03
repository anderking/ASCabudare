import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCategoryAll,
  mockTestIngresoEgresoAll,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { DecimalPipe } from "@angular/common";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let ingresoEgresoFacadeService: IngresoEgresoFacadeService;
  let categoryFacadeService: CategoryFacadeService;
  let sharedFacadeService: SharedFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
        DecimalPipe,
      ],
      declarations: [DashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    ingresoEgresoFacadeService = TestBed.inject(IngresoEgresoFacadeService);
    categoryFacadeService = TestBed.inject(CategoryFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should to equal title component", () => {
    component.isLoading = false;
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const element = htmlElement.querySelector("h2");

    expect(element.textContent).toEqual("TEXTS.EARNINGS");
  });

  it("should call getAll$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(ingresoEgresoFacadeService, "getAll$").and.returnValue(
      of(mockTestIngresoEgresoAll)
    );

    component.loadItems();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getAll$ from categoryFacadeService", () => {
    const mySpy = spyOn(categoryFacadeService, "getAll$").and.returnValue(
      of(mockTestCategoryAll)
    );

    component.loadItems();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call reset from ngOnDestroy", () => {
    const mySpy = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getLoading$ from chargeIndicatorManager", () => {
    const mySpyIe = spyOn(
      ingresoEgresoFacadeService,
      "getLoading$"
    ).and.returnValue(of(true));

    const mySpyCa = spyOn(categoryFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    component.chargeIndicatorManager();

    expect(mySpyIe).toHaveBeenCalled();
    expect(mySpyCa).toHaveBeenCalled();
  });
});
