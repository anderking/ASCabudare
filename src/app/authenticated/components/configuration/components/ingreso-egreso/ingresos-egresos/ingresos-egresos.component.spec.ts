import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { IngresosEgresosComponent } from "./ingresos-egresos.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCurrentFilterOne,
  mockTestCurrentUserOne,
  mockTestIngresoEgresoAll,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../ingreso-egreso-routing.module";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { DebugElement } from "@angular/core";

describe("IngresosEgresosComponent", () => {
  let component: IngresosEgresosComponent;
  let fixture: ComponentFixture<IngresosEgresosComponent>;
  let ingresoEgresoFacadeService: IngresoEgresoFacadeService;
  let authFacadeService: AuthFacadeService;
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
      declarations: [IngresosEgresosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosEgresosComponent);
    ingresoEgresoFacadeService = TestBed.inject(IngresoEgresoFacadeService);
    authFacadeService = TestBed.inject(AuthFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should to equal title component", () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const element = htmlElement.querySelector("h2");

    expect(element.textContent).toEqual("TITLES.INGRESS_EGRESS");
  });

  it("should to equal title component", () => {
    const debugElement: DebugElement = fixture.debugElement;
    const htmlElement: HTMLElement = debugElement.nativeElement;
    const element = htmlElement.querySelector("h6");

    expect(element.textContent).toEqual(" TEXTS.REGISTERS");
  });

  it("should call getCurrentUser$ from authFacadeService", () => {
    const mySpy = spyOn(authFacadeService, "getCurrentUser$").and.returnValue(
      of(mockTestCurrentUserOne)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getCurrentFilter$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(
      ingresoEgresoFacadeService,
      "getCurrentFilter$"
    ).and.returnValue(of(mockTestCurrentFilterOne));

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  xit("should call search from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(ingresoEgresoFacadeService, "search").and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getAll$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(ingresoEgresoFacadeService, "getAll$").and.returnValue(
      of(mockTestIngresoEgresoAll)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getLoading$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(
      ingresoEgresoFacadeService,
      "getLoading$"
    ).and.returnValue(of(true));

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  xit("should call reset from ngOnDestroy", () => {
    const mySpyIe = spyOn(
      ingresoEgresoFacadeService,
      "reset"
    ).and.callThrough();
    const mySpySe = spyOn(ingresoEgresoFacadeService, "setCurrentFilter");
    const mySpySh = spyOn(sharedFacadeService, "reset").and.callThrough();
    component.rangeDate = { startDate: "string", endDate: "string" };
    component.wordFilter = "string";

    component.ngOnDestroy();

    expect(mySpyIe).toHaveBeenCalled();
    expect(mySpySe).toHaveBeenCalledWith(mockTestCurrentFilterOne);
    expect(mySpySh).toHaveBeenCalled();
  });
});
