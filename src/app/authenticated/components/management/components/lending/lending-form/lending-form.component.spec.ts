import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { LendingFormComponent } from "./lending-form.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import {
  mockTestClientAll,
  mockTestComboAll,
  mockTestCurrentUserOne,
  mockTestLendingAll,
  mockTestLendingOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { BehaviorSubject, of } from "rxjs";
import { FormControl } from "@angular/forms";
import { ClientFacadeService } from "@facades/client-facade.service";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { LendingFacadeService } from "@facades/lending-facade.service";
import { LendingModel } from "@models/management/lending.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComboModel } from "@models/masters/combo.model";
import { ClientModel } from "@models/configurations/client.model";
import { buildCreateDate } from "@root/core/utilities/core.utilities";

describe("LendingFormComponent", () => {
  let component: LendingFormComponent;
  let fixture: ComponentFixture<LendingFormComponent>;
  let ingresoEgresoFacadeService: LendingFacadeService;
  let clientFacadeService: ClientFacadeService;
  let combosFacadeService: CombosFacadeService;
  let authFacadeService: AuthFacadeService;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [LendingFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingFormComponent);
    ingresoEgresoFacadeService = TestBed.inject(LendingFacadeService);
    clientFacadeService = TestBed.inject(ClientFacadeService);
    combosFacadeService = TestBed.inject(CombosFacadeService);
    authFacadeService = TestBed.inject(AuthFacadeService);
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
    component.clientCombo$ = new BehaviorSubject<ClientModel[]>(
      mockTestClientAll
    );
    component.stateSolvencyCombo$ = new BehaviorSubject<ComboModel[]>(
      mockTestComboAll
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

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getAll$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(ingresoEgresoFacadeService, "getAll$").and.returnValue(
      of(mockTestLendingAll)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getCurrentItem$ from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(
      ingresoEgresoFacadeService,
      "getCurrentItem$"
    ).and.returnValue(of(mockTestLendingOne));

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call select from ingresoEgresoFacadeService from selectCurrentItem", () => {
    const data = mockTestLendingOne;
    const mySpy = spyOn(ingresoEgresoFacadeService, "select");

    component.selectCurrentItem(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call getAll$ from clientFacadeService", () => {
    const mySpyCa = spyOn(clientFacadeService, "getAll$").and.returnValue(
      of(mockTestClientAll)
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

    const mySpyCa = spyOn(clientFacadeService, "getLoading$").and.returnValue(
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

  it("should to contain 10 fields the form", () => {
    let controls: object = component.mainForm.controls;
    let countControls: number = Object.keys(controls).length;

    expect(component.mainForm.contains("id")).toBeTruthy();
    expect(component.mainForm.contains("idClient")).toBeTruthy();
    expect(component.mainForm.contains("client")).toBeTruthy();
    expect(component.mainForm.contains("idTypeActive")).toBeTruthy();
    expect(component.mainForm.contains("typeActive")).toBeTruthy();
    expect(component.mainForm.contains("idStateSolvency")).toBeTruthy();
    expect(component.mainForm.contains("stateSolvency")).toBeTruthy();
    expect(component.mainForm.contains("amount")).toBeTruthy();
    expect(component.mainForm.contains("description")).toBeTruthy();
    expect(component.mainForm.contains("state")).toBeTruthy();
    expect(countControls).toEqual(10);
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
    component.clientCombo$ = new BehaviorSubject<ClientModel[]>(
      mockTestClientAll
    );
    component.stateSolvencyCombo$ = new BehaviorSubject<ComboModel[]>(
      mockTestComboAll
    );
    component.isLoading = false;
    const data: LendingModel = {
      ...mockTestLendingOne,
      createDate: buildCreateDate().createDate,
      createDateFB: buildCreateDate().createDateFB,
      stateText: "Activa",
    };
    const mySpy = spyOn(ingresoEgresoFacadeService, "create");

    component.mainForm.patchValue(data);
    component.dataForm = data;
    component.currentItem = null;

    fixture.detectChanges();
    const debugElement: DebugElement[] = fixture.debugElement.queryAll(
      By.css("button.btn")
    );

    debugElement[0].triggerEventHandler("click", null);

    expect(component.mainForm.valid).toBeTruthy();
    expect(mySpy).toHaveBeenCalledWith(data);
  });
});
