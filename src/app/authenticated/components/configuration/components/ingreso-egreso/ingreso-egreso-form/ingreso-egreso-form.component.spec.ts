import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { IngresoEgresoCreateComponent } from "./ingreso-egreso-form.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCategoryAll,
  mockTestComboAll,
  mockTestCurrentUserOne,
  mockTestIngresoEgresoAll,
  mockTestIngresoEgresoOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { BehaviorSubject, of } from "rxjs";
import { FormControl } from "@angular/forms";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../ingreso-egreso-routing.module";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComboModel } from "@models/masters/combo.model";
import { CategoryModel } from "@models/configurations/category.model";

describe("IngresoEgresoCreateComponent", () => {
  let component: IngresoEgresoCreateComponent;
  let fixture: ComponentFixture<IngresoEgresoCreateComponent>;
  let ingresoEgresoFacadeService: IngresoEgresoFacadeService;
  let categoryFacadeService: CategoryFacadeService;
  let combosFacadeService: CombosFacadeService;
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
      declarations: [IngresoEgresoCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoEgresoCreateComponent);
    ingresoEgresoFacadeService = TestBed.inject(IngresoEgresoFacadeService);
    categoryFacadeService = TestBed.inject(CategoryFacadeService);
    combosFacadeService = TestBed.inject(CombosFacadeService);
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
    const element = htmlElement.querySelector("h1");

    expect(element.textContent).toEqual("TITLES.INGRESS_EGRESS");
  });

  it("should to equal button text", () => {
    component.typeActiveCombo$ = new BehaviorSubject<ComboModel[]>(
      mockTestComboAll
    );
    component.categoryCombo$ = new BehaviorSubject<CategoryModel[]>(
      mockTestCategoryAll
    );
    component.isLoading = false;
    fixture.detectChanges();
    const debugElement: DebugElement[] = fixture.debugElement.queryAll(
      By.css("button.btn")
    );

    let htmlElement: HTMLElement = debugElement[0].nativeElement;
    expect(htmlElement.textContent).toContain("BUTTONS.SAVE");

    htmlElement = debugElement[1].nativeElement;
    expect(htmlElement.textContent).toContain("BUTTONS.CLEAN");

    htmlElement = debugElement[2].nativeElement;
    expect(htmlElement.textContent).toContain("BUTTONS.BACK");
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

  it("should call search from ingresoEgresoFacadeService", () => {
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

  it("should call getCurrentItem$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(
      ingresoEgresoFacadeService,
      "getCurrentItem$"
    ).and.returnValue(of(mockTestIngresoEgresoOne));

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call select from ingresoEgresoFacadeService from selectCurrentItem", () => {
    const data = mockTestIngresoEgresoOne;
    const mySpy = spyOn(ingresoEgresoFacadeService, "select");

    component.selectCurrentItem(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call reset from ngOnDestroy", () => {
    const mySpyIe = spyOn(
      ingresoEgresoFacadeService,
      "reset"
    ).and.callThrough();
    const mySpyCa = spyOn(categoryFacadeService, "reset").and.callThrough();
    const mySpyCo = spyOn(combosFacadeService, "reset").and.callThrough();
    const mySpySh = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpyIe).toHaveBeenCalled();
    expect(mySpyCa).toHaveBeenCalled();
    expect(mySpyCo).toHaveBeenCalled();
    expect(mySpySh).toHaveBeenCalled();
  });

  it("should call combos from callsCombos", () => {
    const mySpyCa = spyOn(categoryFacadeService, "search").and.callThrough();
    const mySpyCo = spyOn(
      combosFacadeService,
      "searchTypeActive"
    ).and.callThrough();

    component.callsCombos();

    expect(mySpyCa).toHaveBeenCalled();
    expect(mySpyCo).toHaveBeenCalled();
  });

  it("should call getAll$ from categoryFacadeService", () => {
    const mySpyCa = spyOn(categoryFacadeService, "getAll$").and.returnValue(
      of(mockTestCategoryAll)
    );
    const mySpyCo = spyOn(
      combosFacadeService,
      "getTypeActive$"
    ).and.returnValue(of(mockTestComboAll));

    component.callsCombos();

    expect(mySpyCa).toHaveBeenCalled();
    expect(mySpyCo).toHaveBeenCalled();
  });

  it("should call getLoading$ from chargeIndicatorManager", () => {
    const mySpyIe = spyOn(
      ingresoEgresoFacadeService,
      "getLoading$"
    ).and.returnValue(of(true));

    const mySpyCa = spyOn(categoryFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    const mySpyCo = spyOn(combosFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    component.chargeIndicatorManager();

    expect(mySpyIe).toHaveBeenCalled();
    expect(mySpyCa).toHaveBeenCalled();
    expect(mySpyCo).toHaveBeenCalled();
  });

  it("should to contain 9 fields the form", () => {
    let controls: object = component.mainForm.controls;
    let countControls: number = Object.keys(controls).length;

    expect(component.mainForm.contains("id")).toBeTruthy();
    expect(component.mainForm.contains("idCategory")).toBeTruthy();
    expect(component.mainForm.contains("category")).toBeTruthy();
    expect(component.mainForm.contains("idTypeActive")).toBeTruthy();
    expect(component.mainForm.contains("typeActive")).toBeTruthy();
    expect(component.mainForm.contains("createDate")).toBeTruthy();
    expect(component.mainForm.contains("amount")).toBeTruthy();
    expect(component.mainForm.contains("description")).toBeTruthy();
    expect(component.mainForm.contains("state")).toBeTruthy();
    expect(countControls).toEqual(9);
  });

  it("should description be valid", () => {
    let controls: object = component.mainForm.controls;
    const field = controls["description"] as FormControl;

    field.setValue("description");

    expect(field.valid).toBeTruthy();
    expect(field.value.length).toBeLessThanOrEqual(700);
  });

  it("should call create from ingresoEgresoFacadeService if valid form from button save html", () => {
    component.typeActiveCombo$ = new BehaviorSubject<ComboModel[]>(
      mockTestComboAll
    );
    component.categoryCombo$ = new BehaviorSubject<CategoryModel[]>(
      mockTestCategoryAll
    );
    component.isLoading = false;
    const createDateISO: string = new Date().toISOString();
    const createDate = createDateISO.split("T")[0];
    const hoursISO = createDateISO.split("T")[1];
    const hours = hoursISO.split(".")[0];
    const newDate = createDate + "T" + hours;
    const date = new Date(newDate);
    const data: IngresoEgresoModel = {
      ...mockTestIngresoEgresoOne,
      createDate: createDate,
      createDateFB: date,
      stateText: "Activa",
    };
    const mySpy = spyOn(ingresoEgresoFacadeService, "create");

    component.mainForm.patchValue(data);
    component.dataForm = data;

    fixture.detectChanges();
    const debugElement: DebugElement[] = fixture.debugElement.queryAll(
      By.css("button.btn")
    );

    debugElement[0].triggerEventHandler("click", null);

    expect(component.mainForm.valid).toBeTruthy();
    expect(mySpy).toHaveBeenCalledWith(data);
  });
});
