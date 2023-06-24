import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { NavbarComponent } from "./navbar.component";
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
import { RouterLinkWithHref } from "@angular/router";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
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
      declarations: [NavbarComponent, RouterLinkDirectiveStub],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should routerLinks to equal 6 and match string", () => {
    const debugElement: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );

    const routerLinks = debugElement.map((link) =>
      link.injector.get(RouterLinkWithHref)
    );
    expect(debugElement.length).toEqual(6);
    expect(routerLinks[0].href).toEqual("/authenticated/home");
    expect(routerLinks[1].href).toEqual("/authenticated/home");
    expect(routerLinks[2].href).toEqual(
      "/authenticated/configuration/category"
    );
    expect(routerLinks[3].href).toEqual(
      "/authenticated/configuration/ingreso-egreso"
    );
    expect(routerLinks[4].href).toEqual("/authenticated/configuration/profile");
    expect(routerLinks[5].href).toEqual("/authenticated/configuration/profile");
  });
});
