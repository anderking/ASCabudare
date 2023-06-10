import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgForm } from "@angular/forms";
import { RegisterComponent } from "./register.component";
import { AuthService } from "@services/auth/auth.service";
import { environment } from "src/environments/environment";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../auth-routing.module";
import { SharedModule } from "@root/shared/shared.module";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { of } from "rxjs";
import { CurrentUserModel } from "@models/auth/current-user.model";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let authFacadeService: AuthFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        SharedModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [RegisterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    authService = TestBed.inject(AuthService);
    authFacadeService = TestBed.inject(AuthFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getLoading$ from authFacadeService", () => {
    const mySpy = spyOn(authFacadeService, "getLoading$").and.callThrough();
    component.ngOnInit();
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getRegister$ from authFacadeService", () => {
    const mySpy = spyOn(authFacadeService, "getRegister$").and.callThrough();
    component.ngOnInit();
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call setUserDoc with payload from getRegister$", () => {
    const payload: CurrentUserModel = {
      displayName: "string",
      email: "string",
      emailVerified: true,
      phoneNumber: "string",
      currency: "",
      dayStartDashboard: "",
      photoURL: "string",
      uid: "string",
    };
    const mySpy = spyOn(authFacadeService, "setUserDoc");
    spyOn(authFacadeService, "getRegister$").and.returnValue(of(payload));
    component.ngOnInit();
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledWith(payload);
  });

  it("should call getUserDoc$ from authFacadeService", () => {
    const mySpy = spyOn(authFacadeService, "getUserDoc$").and.callThrough();
    component.ngOnInit();
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call logout from authService", () => {
    const mySpy = spyOn(authService, "logout").and.callThrough();
    component.ngAfterViewInit();
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call reset from authFacadeService", () => {
    const mySpy = spyOn(authFacadeService, "reset").and.callThrough();
    component.ngOnDestroy();
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should submit valid form", () => {
    const data = { email: "test@example.com", password: "password123" };
    const spy = spyOn(authFacadeService, "register");

    component.mainForm = {
      form: {
        valid: true,
        getRawValue: () => data,
      },
    } as NgForm;

    component.onSubmit();
    expect(component.mainForm.form.valid).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(data);
  });
});
