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
  mockTestCurrentFilterOne,
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

describe("ClientShowComponent", () => {
  let component: ClientShowComponent;
  let fixture: ComponentFixture<ClientShowComponent>;
  let lendingFacadeService: LendingFacadeService;
  let clientFacadeService: ClientFacadeService;
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
      declarations: [ClientShowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientShowComponent);
    lendingFacadeService = TestBed.inject(LendingFacadeService);
    clientFacadeService = TestBed.inject(ClientFacadeService);
    authFacadeService = TestBed.inject(AuthFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
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

  it("should call delete from lendingFacadeService from goDelete", () => {
    const data = mockTestLendingOne;
    const mySpy = spyOn(lendingFacadeService, "delete");

    component.goDelete(data);

    expect(mySpy).toHaveBeenCalledWith(data);
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
