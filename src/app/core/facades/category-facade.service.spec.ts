import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { storeMock } from "@root/core/constants/mocks/mocks";
import * as actions from "@store/configuration/actions/category.actions";
import { CategoryFacadeService } from "@facades/category-facade.service";
import {
  mockTestCategoryAll,
  mockTestCategoryOne,
  mockTestCurrentUserOne,
} from "@constants/mocks/mocks-units-test";
import {
  collectionFB,
  collectionFBSecond,
} from "@constants/configurations/category.constants";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { CategoryModel } from "@models/configurations/category.model";

describe("CategoryFacadeService", () => {
  let facadeService: CategoryFacadeService;
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

    facadeService = TestBed.inject(CategoryFacadeService);
    store = TestBed.inject(Store);
  }));

  it("should create", () => {
    expect(facadeService).toBeTruthy();
  });

  describe("search", () => {
    it("should expect the search method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "search");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFB).toEqual("Category");
      expect(collectionFBSecond).toEqual("Items");
    });

    it("should expect dispatch search action with the correct props", () => {
      const currentUser: CurrentUserModel = mockTestCurrentUserOne;
      facadeService.search();
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchApi({
          props: {
            url: `${currentUser.uid}/${collectionFB}/${collectionFBSecond}`,
          },
        })
      );
    });

    it("should return the getAll$ observable type CategoryModel[]", () => {
      const mock: CategoryModel[] = mockTestCategoryAll;
      spyOn(facadeService, "getAll$").and.returnValue(of(mock));
      const result$ = facadeService.getAll$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("searchOne", () => {
    it("should expect the searchOne method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "searchOne");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFB).toEqual("Category");
      expect(collectionFBSecond).toEqual("Items");
    });

    it("should expect dispatch searchOne action with the correct props", () => {
      const currentUser: CurrentUserModel = mockTestCurrentUserOne;
      const id: string = "string";
      facadeService.searchOne(id);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchOneApi({
          props: {
            url: `${currentUser.uid}/${collectionFB}/${collectionFBSecond}`,
            id,
          },
        })
      );
    });

    it("should return the getOne$ observable type CategoryModel", () => {
      const mock: CategoryModel = mockTestCategoryOne;
      spyOn(facadeService, "getOne$").and.returnValue(of(mock));
      const result$ = facadeService.getOne$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("create", () => {
    it("should expect the create method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "create");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFB).toEqual("Category");
      expect(collectionFBSecond).toEqual("Items");
    });

    it("should expect dispatch create action with the correct props", () => {
      const currentUser: CurrentUserModel = mockTestCurrentUserOne;
      const payload: CategoryModel = mockTestCategoryOne;
      facadeService.create(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.createApi({
          props: {
            url: `${currentUser.uid}/${collectionFB}/${collectionFBSecond}`,
            payload,
          },
        })
      );
    });
  });

  describe("update", () => {
    it("should expect the update method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "update");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFB).toEqual("Category");
      expect(collectionFBSecond).toEqual("Items");
    });

    it("should expect dispatch update action with the correct props", () => {
      const currentUser: CurrentUserModel = mockTestCurrentUserOne;
      const payload: CategoryModel = mockTestCategoryOne;
      facadeService.update(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.updateApi({
          props: {
            url: `${currentUser.uid}/${collectionFB}/${collectionFBSecond}`,
            payload,
          },
        })
      );
    });
  });

  describe("delete", () => {
    it("should expect the delete method to exist and to call the correct endpoint", () => {
      spy = spyOn(facadeService, "delete");
      expect(spy).not.toBeNull();
      expect(spy).toBeDefined();
      expect(collectionFB).toEqual("Category");
      expect(collectionFBSecond).toEqual("Items");
    });

    it("should expect dispatch delete action with the correct props", () => {
      const currentUser: CurrentUserModel = mockTestCurrentUserOne;
      const payload: CategoryModel = mockTestCategoryOne;
      facadeService.delete(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.deleteApi({
          props: {
            url: `${currentUser.uid}/${collectionFB}/${collectionFBSecond}`,
            payload,
          },
        })
      );
    });
  });

  describe("select", () => {
    it("should expect dispatch select action with the correct props", () => {
      const payload: CategoryModel = mockTestCategoryOne;
      facadeService.select(payload);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.setCurrentItemId({
          id: payload.id,
        })
      );
    });

    it("should return the getCurrentItem$ observable type CategoryModel", () => {
      const mock: CategoryModel = mockTestCategoryOne;
      spyOn(facadeService, "getCurrentItem$").and.returnValue(of(mock));
      const result$ = facadeService.getCurrentItem$();
      expect(result$).toBeDefined();
      result$.subscribe((result) => {
        expect(result).toEqual(mock);
      });
    });
  });

  describe("reset", () => {
    it("should expect dispatch resetSelected action with the correct props", () => {
      facadeService.resetSelected();
      expect(store.dispatch).toHaveBeenCalledWith(actions.resetSelected());
    });

    it("should expect dispatch reset action with the correct props", () => {
      facadeService.reset();
      expect(store.dispatch).toHaveBeenCalledWith(actions.reset());
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
});
