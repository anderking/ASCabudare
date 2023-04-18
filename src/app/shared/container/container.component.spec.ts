import { ContainerComponent } from "./container.component";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AuthService } from "@services/auth/auth.service";
import { SharedFacadeService } from "@facades/shared-facade.service";

describe("ContainerComponent", () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let authService: AuthService;
  let sharedFacadeService: SharedFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      providers: [AuthService, SharedFacadeService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    authService = TestBed.inject(AuthService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
