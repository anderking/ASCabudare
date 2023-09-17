import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { ClientsComponent } from "./clients.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestClientAll,
  mockTestClientOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { ClientFacadeService } from "@facades/client-facade.service";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../client-routing.module";
import { Router } from "@angular/router";
import { ModalService } from "@services/ui/modal.service";
import { ClientModel } from "@models/configurations/client.model";
import { ModalModel } from "@models/shared/modal.model";

describe("ClientsComponent", () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientFacadeService: ClientFacadeService;
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
      declarations: [ClientsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    clientFacadeService = TestBed.inject(ClientFacadeService);
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

    expect(h2.textContent).toEqual("TITLES.CLIENT");
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

  it("should call getLoading$ from clientFacadeService", () => {
    const mySpy = spyOn(clientFacadeService, "getLoading$").and.returnValue(
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
      "/authenticated/configuration/client/form",
    ]);
  }));

  it("should call navigate from router", fakeAsync(() => {
    const mySpy = spyOn(router, "navigate").and.callThrough();

    component.goEdit(mockTestClientOne);
    tick(0);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/configuration/client/form",
      { id: mockTestClientOne.id },
    ]);
  }));

  it("should call navigate from router", fakeAsync(() => {
    const mySpy = spyOn(router, "navigate").and.callThrough();

    component.goShow(mockTestClientOne);
    tick(0);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith([
      "/authenticated/configuration/client/show",
      { id: mockTestClientOne.id },
    ]);
  }));

  it("should call delete from clientFacadeService from goDelete", () => {
    const data = mockTestClientOne;
    const mySpy = spyOn(clientFacadeService, "delete");

    component.goDelete(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call openModal from modalService", () => {
    const mySpy = spyOn(modalService, "openModal").and.returnValue(
      Promise.resolve({} as ClientModel)
    );

    const mockTestModalOne: ModalModel<ClientModel> = {
      type: "confirmation",
      item: mockTestClientOne,
      title: "TITLES.CONFIRMATION",
      message: "TEXTS.CONFIRMATION",
      buttonYes: "BUTTONS.YES",
      buttonCancel: "BUTTONS.CANCEL",
    };

    component.openModal(mockTestClientOne);

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith(mockTestModalOne);
  });
});
