import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientsComponent } from "./clients.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  mockTestClientAll,
  mockTestClientOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { ClientFacadeService } from "@facades/client-facade.service";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../client-routing.module";

describe("ClientsComponent", () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientFacadeService: ClientFacadeService;
  let sharedFacadeService: SharedFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        SharedModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [ClientsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    clientFacadeService = TestBed.inject(ClientFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should to equal title component", () => {
    const html: HTMLElement = fixture.nativeElement;
    const h2 = html.querySelector("h2");

    expect(h2.textContent).toEqual("TITLES.CLIENT");
  });

  xit("should call search from clientFacadeService", () => {
    const mySpy = spyOn(clientFacadeService, "search").and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getAll$ from clientFacadeService", () => {
    const mySpy = spyOn(clientFacadeService, "getAll$").and.returnValue(
      of(mockTestClientAll)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call getLoading$ from clientFacadeService", () => {
    const mySpy = spyOn(clientFacadeService, "getLoading$").and.returnValue(
      of(true)
    );

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  xit("should call reset from ngOnDestroy", () => {
    const mySpyCa = spyOn(clientFacadeService, "reset").and.callThrough();
    const mySpySh = spyOn(sharedFacadeService, "reset").and.callThrough();

    component.ngOnDestroy();

    expect(mySpyCa).toHaveBeenCalled();
    expect(mySpySh).toHaveBeenCalled();
  });

  it("should call delete from clientFacadeService from goDelete", () => {
    const data = mockTestClientOne;
    const mySpy = spyOn(clientFacadeService, "delete");

    component.goDelete(data);

    expect(mySpy).toHaveBeenCalledWith(data);
  });
});
