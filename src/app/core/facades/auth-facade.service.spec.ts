import { TestBed, waitForAsync } from "@angular/core/testing";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { of } from "rxjs";
import {
  mockTestCurrentUserOne,
  mockTestLoginFormOne,
} from "@constants/mocks/mocks-units-test";
import { collectionFBUser } from "@constants/auth/auth.constants";
import {
  CurrentUserModel,
  LoginFormModel,
} from "@models/auth/current-user.model";
import * as actions from "@store/auth/actions/auth.actions";

describe("AuthFacadeService", () => {
  let facadeService: AuthFacadeService;
  let store: Store;
  let spy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    });

    facadeService = TestBed.inject(AuthFacadeService);
    store = TestBed.inject(Store);
  }));

  it("should create", () => {
    expect(facadeService).toBeTruthy();
  });

  describe("login", () => {
    it("should expect the login method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "login");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBUser).toEqual("User");
    });

    it("should expect dispatch login action with the correct props", () => {
      const payload: LoginFormModel = mockTestLoginFormOne;
      facadeService.login(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.login({ action: { url: collectionFBUser, payload } })
      );
    });

    it("should return the getLogin$ observable type CurrentUserModel", () => {
      const mock: CurrentUserModel = mockTestCurrentUserOne;
      spyOn(facadeService, "getLogin$").and.returnValue(of(mock));
      const result$ = facadeService.getLogin$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("register", () => {
    it("should expect the register method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "register");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBUser).toEqual("User");
    });

    it("should expect dispatch register action with the correct props", () => {
      const payload: LoginFormModel = mockTestLoginFormOne;
      facadeService.register(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.register({ action: { url: collectionFBUser, payload } })
      );
    });

    it("should return the getRegister$ observable type CurrentUserModel", () => {
      const mock: CurrentUserModel = mockTestCurrentUserOne;
      spyOn(facadeService, "getRegister$").and.returnValue(of(mock));
      const result$ = facadeService.getRegister$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("setUserDoc", () => {
    it("should expect the setUserDoc method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "setUserDoc");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBUser).toEqual("User");
    });

    it("should expect dispatch setUserDoc action with the correct props", () => {
      const payload: CurrentUserModel = mockTestCurrentUserOne;
      facadeService.setUserDoc(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.setUserDoc({
          action: { url: `${payload.uid}/${collectionFBUser}`, payload },
        })
      );
    });

    it("should return the getUserDoc$ observable type CurrentUserModel", () => {
      const mock: CurrentUserModel = mockTestCurrentUserOne;
      spyOn(facadeService, "getUserDoc$").and.returnValue(of(mock));
      const result$ = facadeService.getUserDoc$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("updateProfile", () => {
    it("should expect the updateProfile method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "updateProfile");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBUser).toEqual("User");
    });

    it("should expect dispatch updateProfile action with the correct props", () => {
      const payload: CurrentUserModel = mockTestCurrentUserOne;
      facadeService.updateProfile(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.updateProfile({
          action: { url: `${payload.uid}/${collectionFBUser}`, payload },
        })
      );
    });

    it("should return the getUpdateProfileLoading$ observable type boolean", () => {
      const mock: boolean = true;
      spyOn(facadeService, "getUpdateProfileLoading$").and.returnValue(
        of(mock)
      );
      const result$ = facadeService.getUpdateProfileLoading$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("updateProfileFB", () => {
    it("should expect the updateProfileFB method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "updateProfileFB");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBUser).toEqual("User");
    });

    it("should expect dispatch updateProfileFB action with the correct props", () => {
      const payload: CurrentUserModel = mockTestCurrentUserOne;
      facadeService.updateProfileFB(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.updateProfileFB({
          action: { url: `${payload.uid}/${collectionFBUser}`, payload },
        })
      );
    });

    it("should return the getUpdateProfileFBLoading$ observable type boolean", () => {
      const mock: boolean = true;
      spyOn(facadeService, "getUpdateProfileFBLoading$").and.returnValue(
        of(mock)
      );
      const result$ = facadeService.getUpdateProfileFBLoading$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  it("should expect dispatch verifyEmail action with the correct props", () => {
    facadeService.verifyEmail();
    expect(store.dispatch).toHaveBeenCalledWith(actions.verifyEmail());
  });

  describe("forgotPassword", () => {
    it("should expect the forgotPassword method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "forgotPassword");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBUser).toEqual("User");
    });

    it("should expect dispatch forgotPassword action with the correct props", () => {
      const payload: LoginFormModel = mockTestLoginFormOne;
      facadeService.forgotPassword(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.forgotPassword({
          action: { url: collectionFBUser, payload },
        })
      );
    });
  });

  describe("setCurrentUser", () => {
    it("should expect the setCurrentUser method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "setCurrentUser");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
    });

    it("should expect dispatch setCurrentUser action with the correct props", () => {
      const currentUser: CurrentUserModel = mockTestCurrentUserOne;
      facadeService.setCurrentUser(currentUser);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.setCurrentUser({ currentUser })
      );
    });

    it("should return the getCurrentUser$ observable type CurrentUserModel", () => {
      const mock: CurrentUserModel = mockTestCurrentUserOne;
      spyOn(facadeService, "getCurrentUser$").and.returnValue(of(mock));
      const result$ = facadeService.getCurrentUser$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  it("should return the getLoading$ observable type boolean", () => {
    const mock: boolean = true;
    spyOn(facadeService, "getLoading$").and.returnValue(of(mock));
    const result$ = facadeService.getLoading$();
    expect(result$).toBeDefined();
    result$.subscribe((result) => {
      expect(result).toEqual(mock);
    });
  });

  it("should expect dispatch reset action with the correct props", () => {
    facadeService.reset();
    expect(store.dispatch).toHaveBeenCalledWith(actions.reset());
  });
});
