import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfileUpdateComponent } from "./profile-form.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestCurrentUserOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { FormControl } from "@angular/forms";

describe("ProfileUpdateComponent", () => {
  let component: ProfileUpdateComponent;
  let fixture: ComponentFixture<ProfileUpdateComponent>;
  let authFacadeService: AuthFacadeService;
  let attachmentFacadeService: AttachmentFacadeService;
  let sharedFacadeService: SharedFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [ProfileUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUpdateComponent);
    authFacadeService = TestBed.inject(AuthFacadeService);
    attachmentFacadeService = TestBed.inject(AttachmentFacadeService);
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

    expect(h1.textContent).toEqual("TITLES.PROFILE");
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

  it("should call getUrlAttachment$ from attachmentFacadeService", () => {
    const mySpy = spyOn(
      attachmentFacadeService,
      "getUrlAttachment$"
    ).and.returnValue(of("string"));

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call reset from sharedFacadeService", () => {
    const mySpy = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call reset from attachmentFacadeService", () => {
    const mySpy = spyOn(attachmentFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should to contain 7 fields the form", () => {
    let controls: object = component.mainForm.controls;
    let countControls: number = Object.keys(controls).length;

    expect(component.mainForm.contains("displayName")).toBeTruthy();
    expect(component.mainForm.contains("phoneNumber")).toBeTruthy();
    expect(component.mainForm.contains("currency")).toBeTruthy();
    expect(component.mainForm.contains("photoURL")).toBeTruthy();
    expect(component.mainForm.contains("dayStartDashboard")).toBeTruthy();
    expect(component.mainForm.contains("numberOfDecimal")).toBeTruthy();
    expect(component.mainForm.contains("systemDecimal")).toBeTruthy();
    expect(countControls).toEqual(7);
  });

  it("should dayStartDashboard be invalid", () => {
    let controls: object = component.mainForm.controls;
    const days = controls["dayStartDashboard"] as FormControl;

    days.setValue("");

    expect(days.invalid).toBeTruthy();
  });

  it("should dayStartDashboard be valid", () => {
    let controls: object = component.mainForm.controls;
    const days = controls["dayStartDashboard"] as FormControl;

    days.setValue("16");

    expect(days.valid).toBeTruthy();
  });

  it("should numberOfDecimal be invalid", () => {
    let controls: object = component.mainForm.controls;
    const days = controls["numberOfDecimal"] as FormControl;

    days.setValue("x,ss/*");

    expect(days.invalid).toBeTruthy();
  });

  it("should numberOfDecimal be valid", () => {
    let controls: object = component.mainForm.controls;
    const days = controls["numberOfDecimal"] as FormControl;

    days.setValue("2");

    expect(days.valid).toBeTruthy();
  });

  it("should call updateProfile from authFacadeService if valid form", () => {
    const data = mockTestCurrentUserOne;
    const mySpy = spyOn(authFacadeService, "updateProfile");
    component.currentItem = data;

    component.mainForm.reset(data);
    component.onSubmit();

    expect(component.mainForm.valid).toBeTruthy();
    expect(mySpy).toHaveBeenCalledWith(data);
  });
});
