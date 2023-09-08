import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SidebarComponent } from "./sidebar.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { RouterLinkDirectiveStub } from "@root/core/utilities/router-link-directive-stub";
import { RouterLink } from "@angular/router";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { mockTestCurrentUserOne } from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";

describe("SidebarComponent", () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authFacadeService: AuthFacadeService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [SidebarComponent, RouterLinkDirectiveStub],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    authFacadeService = TestBed.inject(AuthFacadeService);
    translateService = TestBed.inject(TranslateService);
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

  it("should call getCurrentUser$ from authFacadeService", () => {
    const mySpyL = spyOn(component, "initLanguage").and.callThrough();
    const mySpyD = spyOn(component, "initDarkMode").and.callThrough();
    const mySpyS = spyOn(component, "loadScript").and.callThrough();

    component.ngOnInit();

    expect(mySpyL).toHaveBeenCalled();
    expect(mySpyD).toHaveBeenCalled();
    expect(mySpyS).toHaveBeenCalled();
  });

  it("should routerLinks to equal 7 and match string", () => {
    const debugElement: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(RouterLink)
    );

    const routerLinks = debugElement.map((link) =>
      link.injector.get(RouterLink)
    );
    expect(debugElement.length).toEqual(7);
    expect(routerLinks[0].href).toEqual("/authenticated/configuration/profile");
    expect(routerLinks[1].href).toEqual("/authenticated/home");
    expect(routerLinks[2].href).toEqual(
      "/authenticated/management/ingreso-egreso"
    );
    expect(routerLinks[3].href).toEqual("/authenticated/management/lending");
    expect(routerLinks[4].href).toEqual(
      "/authenticated/configuration/category"
    );
    expect(routerLinks[5].href).toEqual("/authenticated/configuration/client");
    expect(routerLinks[6].href).toEqual("/authenticated/configuration/profile");
  });

  it("should call localStorage.setItem, translateService.setDefaultLang and translateService.use from changeLanguage", () => {
    const localStorageSpy = spyOn(localStorage, "setItem");
    const translateServiceSpyOne = spyOn(translateService, "setDefaultLang");
    const translateServiceSpyTwo = spyOn(translateService, "use");

    component.changeLanguage(true);

    expect(localStorageSpy).toHaveBeenCalledWith("lang", "en");
    expect(translateServiceSpyOne).toHaveBeenCalledWith("en");
    expect(translateServiceSpyTwo).toHaveBeenCalledWith("en");
  });

  it("should call localStorage.setItem from changeDarkMode", () => {
    const localStorageSpy = spyOn(localStorage, "setItem");

    component.changeDarkMode(true);

    expect(localStorageSpy).toHaveBeenCalledWith("dark-mode", "on");
  });
});
