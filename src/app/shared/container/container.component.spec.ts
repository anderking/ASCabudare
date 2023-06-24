import { ContainerComponent } from "./container.component";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { environment } from "@environments/environment";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { IngresoEgresoFacadeService } from "@facades/ingreso-egreso-facade.service";
import { CategoryFacadeService } from "@facades/category-facade.service";
import { CombosFacadeService } from "@facades/combos-facade.service";
import { SharedFacadeService } from "@facades/shared-facade.service";
import { AuthService } from "@services/auth/auth.service";

describe("ContainerComponent", () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let ingresoEgresoFacadeService: IngresoEgresoFacadeService;
  let categoryFacadeService: CategoryFacadeService;
  let combosFacadeService: CombosFacadeService;
  let sharedFacadeService: SharedFacadeService;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [ContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    ingresoEgresoFacadeService = TestBed.inject(IngresoEgresoFacadeService);
    categoryFacadeService = TestBed.inject(CategoryFacadeService);
    combosFacadeService = TestBed.inject(CombosFacadeService);
    sharedFacadeService = TestBed.inject(SharedFacadeService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call initAuthListener from authService", () => {
    const mySpy = spyOn(authService, "initAuthListener").and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call messageSubscriptions from sharedFacadeService", () => {
    const mySpy = spyOn(
      sharedFacadeService,
      "messageSubscriptions"
    ).and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call search from ingresoEgresoFacadeService", () => {
    const mySpy = spyOn(ingresoEgresoFacadeService, "search").and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call search from categoryFacadeService", () => {
    const mySpy = spyOn(categoryFacadeService, "search").and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call searchTypeActive from combosFacadeService", () => {
    const mySpy = spyOn(
      combosFacadeService,
      "searchTypeActive"
    ).and.callThrough();

    component.ngOnInit();

    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });
});
