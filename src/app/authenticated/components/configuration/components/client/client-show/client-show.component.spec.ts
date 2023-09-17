import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientShowComponent } from "./client-show.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestClientAll,
  mockTestClientOne,
  mockTestCurrentUserOne,
  mockTestLendingAll,
  mockTestLendingOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../../../../management/components/lending/lending-routing.module";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { LendingFacadeService } from "@facades/lending-facade.service";
import { DebugElement } from "@angular/core";
import { ClientFacadeService } from "@facades/client-facade.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalService } from "@services/ui/modal.service";
import { LendingModel } from "@models/management/lending.model";
import { ModalModel } from "@models/shared/modal.model";

class ActivatedRouteStub {
  paramMap = of({ get: (key: string) => "testValue" });
}

describe("ClientShowComponent", () => {
  let component: ClientShowComponent;
  let fixture: ComponentFixture<ClientShowComponent>;
  let lendingFacadeService: LendingFacadeService;
  let clientFacadeService: ClientFacadeService;
  let authFacadeService: AuthFacadeService;
  let sharedFacadeService: SharedFacadeService;
  let activatedRoute: ActivatedRoute;
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
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
      declarations: [ClientShowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientShowComponent);
    lendingFacadeService = TestBed.inject(LendingFacadeService);
    clientFacadeService = TestBed.inject(ClientFacadeService);
    authFacadeService = TestBed.inject(AuthFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    modalService = TestBed.inject(ModalService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should to equal title component", () => {
    const debugElement: DebugElement = fixture.debugElement;
    const htmlElement: HTMLElement = debugElement.nativeElement;
    component.isLoading = false;
    component.currentItem = mockTestClientOne;

    fixture.detectChanges();

    const element = htmlElement.querySelector("h2");
    const count = component.items.length;

    expect(element.textContent).toEqual("TITLES.LENDING");
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

  it("should call activatedRoute$ from activatedRoute", () => {
    const mySpy = spyOn(activatedRoute.paramMap, "pipe").and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getAll$ from lendingFacadeService", () => {
    const mySpy = spyOn(lendingFacadeService, "getAll$").and.returnValue(
      of(mockTestLendingAll)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getAll$ from clientFacadeService", () => {
    const mySpy = spyOn(clientFacadeService, "getAll$").and.returnValue(
      of(mockTestClientAll)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call navigate from router", () => {
    const mySpy = spyOn(router, "navigate").and.callThrough();
    component.currentItem = mockTestClientOne;

    component.goNew();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/management/lending/form",
      { idClient: mockTestClientOne.id },
    ]);
  });

  it("should call navigate from router", () => {
    const mySpy = spyOn(router, "navigate").and.callThrough();
    component.currentItem = mockTestClientOne;

    component.goEdit(mockTestLendingOne);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/management/lending/form",
      { id: mockTestLendingOne.id, idClient: mockTestClientOne.id },
    ]);
  });

  it("should call delete from lendingFacadeService from goDelete", () => {
    const data = mockTestLendingOne;
    const mySpy = spyOn(lendingFacadeService, "delete");

    component.goDelete(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call reset from ngOnDestroy", () => {
    const mySpy = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpy).toHaveBeenCalled();
  });

  it("should call openModal from modalService", () => {
    const mySpy = spyOn(modalService, "openModal").and.returnValue(
      Promise.resolve({} as LendingModel)
    );

    const mockTestModalOne: ModalModel<LendingModel> = {
      type: "confirmation",
      item: mockTestLendingOne,
      title: "TITLES.CONFIRMATION",
      message: "TEXTS.CONFIRMATION",
      buttonYes: "BUTTONS.YES",
      buttonCancel: "BUTTONS.CANCEL",
    };

    component.openModal(mockTestLendingOne);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith(mockTestModalOne);
  });

  it("should call getLoading$ from chargeIndicatorManager", () => {
    const mySpyCl = spyOn(clientFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    const mySpyLe = spyOn(lendingFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    component.chargeIndicatorManager();

    expect(mySpyCl).toHaveBeenCalled();
    expect(mySpyLe).toHaveBeenCalled();
  });
});
