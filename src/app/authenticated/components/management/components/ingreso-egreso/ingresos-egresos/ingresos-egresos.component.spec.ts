import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { IngresosEgresosComponent } from "./ingresos-egresos.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCurrentUserOne,
  mockTestIngresoEgresoAll,
  mockTestIngresoEgresoOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../ingreso-egreso-routing.module";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { DebugElement } from "@angular/core";
import { ModalService } from "@services/ui/modal.service";
import { Router } from "@angular/router";
import { IngresoEgresoModel } from "@models/management/ingreso-egreso.model";
import { ModalModel } from "@models/shared/modal.model";

describe("IngresosEgresosComponent", () => {
  let component: IngresosEgresosComponent;
  let fixture: ComponentFixture<IngresosEgresosComponent>;
  let ingresoEgresoFacadeService: IngresoEgresoFacadeService;
  let authFacadeService: AuthFacadeService;
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
      declarations: [IngresosEgresosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosEgresosComponent);
    ingresoEgresoFacadeService = TestBed.inject(IngresoEgresoFacadeService);
    authFacadeService = TestBed.inject(AuthFacadeService);
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
    const htmlElement: HTMLElement = fixture.nativeElement;
    const element = htmlElement.querySelector("h2");

    expect(element.textContent).toEqual("TITLES.INGRESS_EGRESS");
  });

  it("should to equal title component", () => {
    const debugElement: DebugElement = fixture.debugElement;
    const htmlElement: HTMLElement = debugElement.nativeElement;
    const element = htmlElement.querySelector("h6");
    const count = component.items.length;

    expect(element.textContent).toEqual(count + " TEXTS.REGISTERS");
  });

  it("should call getCurrentUser$ from authFacadeService", () => {
    const mySpy = spyOn(authFacadeService, "getCurrentUser$").and.returnValue(
      of(mockTestCurrentUserOne)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
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

  it("should call getAll$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(ingresoEgresoFacadeService, "getAll$").and.returnValue(
      of(mockTestIngresoEgresoAll)
    );

    component.loadItems();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call navigate from router", fakeAsync(() => {
    const mySpy = spyOn(router, "navigate").and.callThrough();

    component.goNew();
    tick(0);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/management/ingreso-egreso/form",
    ]);
  }));

  it("should call navigate from router", fakeAsync(() => {
    const mySpy = spyOn(router, "navigate").and.callThrough();

    component.goEdit(mockTestIngresoEgresoOne);
    tick(0);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/management/ingreso-egreso/form",
      { id: mockTestIngresoEgresoOne.id },
    ]);
  }));

  it("should call delete from ingresoEgresoFacadeService from goDelete", () => {
    const data = mockTestIngresoEgresoOne;
    const mySpy = spyOn(ingresoEgresoFacadeService, "delete");

    component.goDelete(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call openModal from modalService", () => {
    const mySpy = spyOn(modalService, "openModal").and.returnValue(
      Promise.resolve({} as IngresoEgresoModel)
    );

    const mockTestModalOne: ModalModel<IngresoEgresoModel> = {
      type: "confirmation",
      item: mockTestIngresoEgresoOne,
      title: "TITLES.CONFIRMATION",
      message: "TEXTS.CONFIRMATION",
      buttonYes: "BUTTONS.YES",
      buttonCancel: "BUTTONS.CANCEL",
    };

    component.openModal(mockTestIngresoEgresoOne);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith(mockTestModalOne);
  });
});
