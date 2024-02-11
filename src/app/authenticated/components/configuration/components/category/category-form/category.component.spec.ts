import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryFormComponent } from "./category-form.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCategoryAll,
  mockTestCategoryOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { FormControl } from "@angular/forms";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("CategoryFormComponent", () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let categoryFacadeService: CategoryFacadeService;
  let sharedFacadeService: SharedFacadeService;

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
      declarations: [CategoryFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormComponent);
    categoryFacadeService = TestBed.inject(CategoryFacadeService);
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

    expect(h1.textContent).toEqual("TITLES.CATEGORY");
  });

  it("should to equal button text", () => {
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

  it("should call getAll$ from categoryFacadeService", () => {
    const mySpy = spyOn(categoryFacadeService, "getAll$").and.returnValue(
      of(mockTestCategoryAll)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getCurrentItem$ from categoryFacadeService", () => {
    const mySpy = spyOn(
      categoryFacadeService,
      "getCurrentItem$"
    ).and.returnValue(of(mockTestCategoryOne));

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call select from categoryFacadeService from selectCurrentItem", () => {
    const data = mockTestCategoryOne;
    const mySpy = spyOn(categoryFacadeService, "select");

    component.selectCurrentItem(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });

  it("should call getLoading$ from categoryFacadeService", () => {
    const mySpy = spyOn(categoryFacadeService, "getLoading$").and.returnValue(
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

  it("should call reset from ngOnDestroy", () => {
    const mySpySh = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpySh).toHaveBeenCalled();
  });

  it("should to contain 4 fields the form", () => {
    let controls: object = component.mainForm.controls;
    let countControls: number = Object.keys(controls).length;

    expect(component.mainForm.contains("id")).toBeTruthy();
    expect(component.mainForm.contains("name")).toBeTruthy();
    expect(component.mainForm.contains("description")).toBeTruthy();
    expect(component.mainForm.contains("state")).toBeTruthy();
    expect(countControls).toEqual(4);
  });

  it("should description be valid", () => {
    let controls: object = component.mainForm.controls;
    const field = controls["description"] as FormControl;

    field.setValue("description");

    expect(field.valid).toBeTruthy();
    expect(field.value.length).toBeLessThanOrEqual(700);
  });

  it("should call create from categoryFacadeService if valid form", () => {
    const data = mockTestCategoryOne;
    const mySpy = spyOn(categoryFacadeService, "create");
    component.dataForm = data;

    component.isLoading = false;

    component.mainForm.patchValue(data);
    fixture.detectChanges();
    const debugElement: DebugElement[] = fixture.debugElement.queryAll(
      By.css("button.btn")
    );

    debugElement[0].triggerEventHandler("click", null);

    expect(component.mainForm.valid).toBeTruthy();
    expect(mySpy).toHaveBeenCalledWith(data);
  });
});
