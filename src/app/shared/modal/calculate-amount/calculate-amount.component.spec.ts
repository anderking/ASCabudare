import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { Store } from "@ngrx/store";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { mockTestCurrentUserOne } from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { CalculateAmountComponent } from "./calculate-amount.component";

describe("CalculateAmountComponent", () => {
  let component: CalculateAmountComponent;
  let fixture: ComponentFixture<CalculateAmountComponent>;
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
      declarations: [CalculateAmountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateAmountComponent);
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
});
