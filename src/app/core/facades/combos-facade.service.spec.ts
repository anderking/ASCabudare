import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { storeMock } from "@root/core/constants/mocks/mocks";
import * as actions from "@store/masters/actions/combo.actions";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { ComboModel } from "@models/masters/combo.model";
import { mockTestComboAll } from "@constants/mocks/mocks-units-test";
import { collectionFBTypeActive } from "@constants/masters/masters.constants";

describe("CombosFacadeService", () => {
  let facadeService: CombosFacadeService;
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
    }).compileComponents();

    facadeService = TestBed.inject(CombosFacadeService);
    store = TestBed.inject(Store);
  }));

  it("should create", () => {
    expect(facadeService).toBeTruthy();
  });

  describe("typeActive", () => {
    it("should expect the searchTypeActive method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "searchTypeActive");
      expect(spy).not.toBeNull;
      expect(spy).toBeDefined;
      expect(collectionFBTypeActive).toEqual("Masters/Combos/TypeActive");
    });

    it("should expect dispatch searchTypeActive action with the correct payload", () => {
      facadeService.searchTypeActive();
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchTypeActive({ props: { url: collectionFBTypeActive } })
      );
    });

    it("should return the getTypeActive$ observable type ComboModel[]", () => {
      const mock: ComboModel[] = mockTestComboAll;
      spyOn(facadeService, "getTypeActive$").and.returnValue(of(mock));
      const result$ = facadeService.getTypeActive$();
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

  it("should expect dispatch clear action with the correct payload", () => {
    facadeService.reset();
    expect(store.dispatch).toHaveBeenCalledWith(actions.clearCombos());
  });
});
