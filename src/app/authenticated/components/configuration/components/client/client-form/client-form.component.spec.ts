import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientCreateComponent } from "./client-form.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestClientAll,
  mockTestClientOne,
  mockTestComboAll,
} from "@root/core/constants/mocks/mocks-units-test";
import { BehaviorSubject, of } from "rxjs";
import { ClientFacadeService } from "@facades/client-facade.service";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../client-routing.module";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComboModel } from "@models/masters/combo.model";
import { ClientModel } from "@models/configurations/client.model";
import { buildCreateDate } from "@root/core/utilities/core.utilities";

describe("ClientCreateComponent", () => {
  let component: ClientCreateComponent;
  let fixture: ComponentFixture<ClientCreateComponent>;
  let clientFacadeService: ClientFacadeService;
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
      declarations: [ClientCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreateComponent);
    clientFacadeService = TestBed.inject(ClientFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should to equal title component", () => {
    const html: HTMLElement = fixture.nativeElement;
    const h1 = html.querySelector("h1");

    expect(h1.textContent).toEqual("TITLES.CLIENT");
  });

  it("should to equal button text", () => {
    component.documentTypeCombo$ = new BehaviorSubject<ComboModel[]>(
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

  it("should call getCurrentItem$ from clientFacadeService", () => {
    const mySpy = spyOn(clientFacadeService, "getCurrentItem$").and.returnValue(
      of(mockTestClientOne)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call select from clientFacadeService from selectCurrentItem", () => {
    const data = mockTestClientOne;
    const mySpy = spyOn(clientFacadeService, "select");

    component.selectCurrentItem(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call getLoading$ from clientFacadeService", () => {
    const mySpy = spyOn(clientFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    component.chargeIndicatorManager();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getMessage$ from sharedFacadeService", () => {
    const mySpy = spyOn(sharedFacadeService, "getMessage$").and.returnValue(
      of("string")
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should to contain 11 fields the form", () => {
    let controls: object = component.mainForm.controls;
    let countControls: number = Object.keys(controls).length;
    console.log(controls);

    expect(component.mainForm.contains("id")).toBeTruthy();
    expect(component.mainForm.contains("firstName")).toBeTruthy();
    expect(component.mainForm.contains("lastName")).toBeTruthy();
    expect(component.mainForm.contains("documentType")).toBeTruthy();
    expect(component.mainForm.contains("documentNumber")).toBeTruthy();
    expect(component.mainForm.contains("phoneNumber")).toBeTruthy();
    expect(component.mainForm.contains("city")).toBeTruthy();
    expect(component.mainForm.contains("address")).toBeTruthy();
    expect(component.mainForm.contains("image")).toBeTruthy();
    expect(component.mainForm.contains("state")).toBeTruthy();
    expect(countControls).toEqual(11);
  });

  it("should to contain fields disable in form", () => {
    console.log(component.mainForm.controls);
    expect(component.mainForm.controls["fullName"]).toBeDefined();
    expect(component.mainForm.controls["fullName"].disabled).toBeTruthy();
  });

  it("should call create from clientFacadeService if valid form from button save html", () => {
    component.documentTypeCombo$ = new BehaviorSubject<ComboModel[]>(
      mockTestComboAll
    );
    component.isLoading = false;

    const data: ClientModel = {
      ...mockTestClientOne,
      createDate: buildCreateDate().createDate,
      createDateFB: buildCreateDate().createDateFB,
    };
    const mySpy = spyOn(clientFacadeService, "create");

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
