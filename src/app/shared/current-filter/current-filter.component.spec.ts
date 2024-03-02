import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CurrentFilterComponent } from "./current-filter.component";
import { SharedModule } from "../shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { Store } from "@ngrx/store";
import { AuthFacadeService } from "@facades/auth-facade.service";
import {
  mockTestCurrentFilterOne,
  mockTestCurrentUserOne,
} from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";

describe("CurrentFilterComponent", () => {
  let component: CurrentFilterComponent;
  let fixture: ComponentFixture<CurrentFilterComponent>;
  let authFacadeService: AuthFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [CurrentFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFilterComponent);
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


  it("should return a FormGroup with startDate and endDate controls", () => {
    const form = component.initForm();
    expect(form.get("startDate")).toBeTruthy();
    expect(form.get("endDate")).toBeTruthy();
    expect(form.get("startDate").value).toEqual(component.rangeDate.startDate);
    expect(form.get("endDate").value).toEqual(component.rangeDate.endDate);
  });
});
