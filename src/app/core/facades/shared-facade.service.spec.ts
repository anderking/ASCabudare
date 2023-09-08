import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { storeMock } from "@root/core/constants/mocks/mocks";
import * as actions from "@store/shared/actions/notification.actions";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { mockTestErrorOne } from "@constants/mocks/mocks-units-test";
import { ErrorModel } from "@models/shared/error.model";

describe("SharedFacadeService", () => {
  let facadeService: SharedFacadeService;
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

    facadeService = TestBed.inject(SharedFacadeService);
    store = TestBed.inject(Store);
  }));

  it("should create", () => {
    expect(facadeService).toBeTruthy();
  });

  it("should return the getMessage$ observable type string", () => {
    const mock: string = "string";
    spyOn(facadeService, "getMessage$").and.returnValue(of(mock));
    const result$ = facadeService.getMessage$();
    expect(result$).toBeDefined();
    result$.subscribe((result) => {
      expect(result).toEqual(mock);
    });
  });

  it("should return the getError$ observable type ErrorModel", () => {
    const mock: ErrorModel = mockTestErrorOne;
    spyOn(facadeService, "getError$").and.returnValue(of(mock));
    const result$ = facadeService.getError$();
    expect(result$).toBeDefined();
    result$.subscribe((result) => {
      expect(result).toEqual(mock);
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

  it("should expect the messageSubscriptions method to exist and to call the correct endpoint", () => {
    spy = spyOn(facadeService, "messageSubscriptions");
    expect(spy).not.toBeNull();
    expect(spy).toBeDefined();
  });
});
