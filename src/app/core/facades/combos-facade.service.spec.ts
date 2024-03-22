import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { storeMock } from "@root/core/constants/mocks/mocks";
import * as actions from "@store/masters/actions/combo.actions";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { ComboModel } from "@models/masters/combo.model";
import { mockTestComboAll } from "@constants/mocks/mocks-units-test";
import {
  collectionFBCurrency,
  collectionFBDocumentType,
  collectionFBPayType,
  collectionFBStateSolvency,
  collectionFBTypeActive,
} from "@constants/masters/masters.constants";

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
    });

    facadeService = TestBed.inject(CombosFacadeService);
    store = TestBed.inject(Store);
  }));

  it("should create", () => {
    expect(facadeService).toBeTruthy();
  });

  describe("typeActive", () => {
    it("should expect the searchTypeActive method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "searchTypeActive");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBTypeActive).toEqual("Masters/Combos/TypeActive");
    });

    it("should expect dispatch searchTypeActive action with the correct props", () => {
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

  describe("documentType", () => {
    it("should expect the searchDocumentType method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "searchDocumentType");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBDocumentType).toEqual("Masters/Combos/DocumentType");
    });

    it("should expect dispatch searchDocumentType action with the correct props", () => {
      facadeService.searchDocumentType();
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchDocumentType({ props: { url: collectionFBDocumentType } })
      );
    });

    it("should return the getDocumentType$ observable type ComboModel[]", () => {
      const mock: ComboModel[] = mockTestComboAll;
      spyOn(facadeService, "getDocumentType$").and.returnValue(of(mock));
      const result$ = facadeService.getDocumentType$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("stateSolvency", () => {
    it("should expect the searchStateSolvency method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "searchStateSolvency");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBStateSolvency).toEqual("Masters/Combos/StateSolvency");
    });

    it("should expect dispatch searchStateSolvency action with the correct props", () => {
      facadeService.searchStateSolvency();
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchStateSolvency({
          props: { url: collectionFBStateSolvency },
        })
      );
    });

    it("should return the getStateSolvency$ observable type ComboModel[]", () => {
      const mock: ComboModel[] = mockTestComboAll;
      spyOn(facadeService, "getStateSolvency$").and.returnValue(of(mock));
      const result$ = facadeService.getStateSolvency$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("currency", () => {
    it("should expect the searchCurrency method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "searchCurrency");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBCurrency).toEqual("Masters/Combos/Currency");
    });

    it("should expect dispatch searchCurrency action with the correct props", () => {
      facadeService.searchCurrency();
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchCurrency({ props: { url: collectionFBCurrency } })
      );
    });

    it("should return the getCurrency$ observable type ComboModel[]", () => {
      const mock: ComboModel[] = mockTestComboAll;
      spyOn(facadeService, "getCurrency$").and.returnValue(of(mock));
      const result$ = facadeService.getCurrency$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("payType", () => {
    it("should expect the searchPayType method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "searchPayType");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFBPayType).toEqual("Masters/Combos/PayType");
    });

    it("should expect dispatch searchPayType action with the correct props", () => {
      facadeService.searchPayType();
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchPayType({ props: { url: collectionFBPayType } })
      );
    });

    it("should return the getPayType$ observable type ComboModel[]", () => {
      const mock: ComboModel[] = mockTestComboAll;
      spyOn(facadeService, "getPayType$").and.returnValue(of(mock));
      const result$ = facadeService.getPayType$();
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
    expect(store.dispatch).toHaveBeenCalledWith(actions.resetCombos());
  });
});
