import { TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { Auth, getAuth, provideAuth } from "@angular/fire/auth";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";

describe("AuthService", () => {
  let authService: AuthService;
  let authFacadeService: AuthFacadeService;
  let afAuth: Auth;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();
    afAuth = TestBed.inject(Auth);
    authService = TestBed.inject(AuthService);
    authFacadeService = TestBed.inject(AuthFacadeService);
  }));

  it("should create", () => {
    expect(authService).toBeTruthy();
  });

  describe("logout", () => {
    it("should call reset from authFacadeService", () => {
      let mySpy = spyOn(authFacadeService, "reset").and.callThrough();
      authService.logout();
      expect(mySpy).not.toBeNull;
      expect(mySpy).toBeTruthy();
      expect(mySpy).toBeDefined();
      expect(mySpy).toHaveBeenCalled();
    });
    it("should call signOut from afAuth", () => {
      let mySpy = spyOn(afAuth, "signOut").and.callThrough();
      authService.logout();
      expect(mySpy).not.toBeNull;
      expect(mySpy).toBeTruthy();
      expect(mySpy).toBeDefined();
      expect(mySpy).toHaveBeenCalled();
    });
  });
});
