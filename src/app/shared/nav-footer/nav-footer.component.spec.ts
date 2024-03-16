import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavFooterComponent } from "./nav-footer.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
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

describe("NavFooterComponent", () => {
  let component: NavFooterComponent;
  let fixture: ComponentFixture<NavFooterComponent>;
  let authFacadeService: AuthFacadeService;

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
      declarations: [NavFooterComponent, RouterLinkDirectiveStub],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFooterComponent);
    authFacadeService = TestBed.inject(AuthFacadeService);
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

  it("should routerLinks to equal 3 and match string", () => {
    const debugElement: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(RouterLink)
    );

    const routerLinks = debugElement.map((link) =>
      link.injector.get(RouterLink)
    );
    expect(debugElement.length).toEqual(3);
    expect(routerLinks[0].href).toEqual("/authenticated/configuration/profile");
    expect(routerLinks[1].href).toEqual("/authenticated/home");
    expect(routerLinks[2].href).toEqual("/authenticated/management/pay");
  });
});
