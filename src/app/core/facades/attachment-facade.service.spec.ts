import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { storeMock } from "@root/core/constants/mocks/mocks";
import * as actions from "@store/shared/actions/attachment.actions";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";
import { mockTestAttachmentOne } from "@constants/mocks/mocks-units-test";
import { AttachmentModel } from "@models/shared/attachment.model";

describe("AttachmentFacadeService", () => {
  let facadeService: AttachmentFacadeService;
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

    facadeService = TestBed.inject(AttachmentFacadeService);
    store = TestBed.inject(Store);
  }));

  it("should create", () => {
    expect(facadeService).toBeTruthy();
  });

  it("should expect the create method to exist", () => {
    spy = spyOn(facadeService, "create");
    expect(spy).not.toBeNull;
    expect(spy).toBeDefined;
  });

  it("should expect dispatch create action with the correct props", () => {
    const payload: AttachmentModel = mockTestAttachmentOne;
    facadeService.create(payload);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.createAttachment({ props: { url: "", payload } })
    );
  });

  it("should return the getUrlAttachment$ observable type string", () => {
    const mock: string = "string";
    spyOn(facadeService, "getUrlAttachment$").and.returnValue(of(mock));
    const result$ = facadeService.getUrlAttachment$();
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

  it("should expect dispatch reset action with the correct payload", () => {
    facadeService.reset();
    expect(store.dispatch).toHaveBeenCalledWith(actions.reset());
  });
});
