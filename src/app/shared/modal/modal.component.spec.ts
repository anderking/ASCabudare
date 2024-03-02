import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { Store } from "@ngrx/store";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { mockTestCurrentUserOne } from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";
import { ModalComponent } from "./modal.component";
import { PayModel } from "@models/management/pay.model";

describe("ModalComponent", () => {
  let component: ModalComponent<PayModel>;
  let fixture: ComponentFixture<ModalComponent<PayModel>>;
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
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent<PayModel>);
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
