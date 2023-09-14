import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { LendingsComponent } from "./lendings.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCurrentFilterOne,
  mockTestCurrentUserOne,
  mockTestLendingAll,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../../../../management/components/lending/lending-routing.module";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { LendingFacadeService } from "@facades/lending-facade.service";
import { DebugElement } from "@angular/core";

describe("LendingsComponent", () => {
  let component: LendingsComponent;
  let fixture: ComponentFixture<LendingsComponent>;
  let lendingFacadeService: LendingFacadeService;
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
      declarations: [LendingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingsComponent);
    lendingFacadeService = TestBed.inject(LendingFacadeService);
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

    expect(element.textContent).toEqual("TITLES.LENDING");
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

  xit("should call search from lendingFacadeService", () => {
    const mySpy = spyOn(lendingFacadeService, "search").and.callThrough();

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

    component.loadItems();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getLoading$ from lendingFacadeService", () => {
    const mySpy = spyOn(lendingFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  xit("should call reset from ngOnDestroy", () => {
    const mySpyIe = spyOn(lendingFacadeService, "reset").and.callThrough();
    const mySpySh = spyOn(sharedFacadeService, "reset").and.callThrough();
    component.rangeDate = { startDate: "string", endDate: "string" };
    component.wordFilter = "string";

    component.ngOnDestroy();

    expect(mySpyIe).toHaveBeenCalled();
    expect(mySpySh).toHaveBeenCalled();
  });
});
