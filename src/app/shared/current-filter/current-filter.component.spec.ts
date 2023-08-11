import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CurrentFilterComponent } from "./current-filter.component";
import { SharedModule } from "../shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { Store } from "@ngrx/store";
import { AuthFacadeService } from "@facades/auth-facade.service";
import {
  mockTestCurrentFilterOne,
  mockTestCurrentUserOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";

describe("CurrentFilterComponent", () => {
  let component: CurrentFilterComponent;
  let fixture: ComponentFixture<CurrentFilterComponent>;
  let ingresoEgresoFacadeService: IngresoEgresoFacadeService;
  let authFacadeService: AuthFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [CurrentFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFilterComponent);
    authFacadeService = TestBed.inject(AuthFacadeService);
    ingresoEgresoFacadeService = TestBed.inject(IngresoEgresoFacadeService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
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

  it("should call getCurrentFilter$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(
      ingresoEgresoFacadeService,
      "getCurrentFilter$"
    ).and.returnValue(of(mockTestCurrentFilterOne));

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call setCurrentFilter from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(ingresoEgresoFacadeService, "setCurrentFilter");
    component.rangeDate = { startDate: "2023-01-01", endDate: "2023-01-31" };
    component.wordFilter = "string";
    component.wordFilterActive = true;

    component.ngOnDestroy();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith(mockTestCurrentFilterOne);
  });
});
