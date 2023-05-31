import { ContainerComponent } from "./container.component";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { environment } from "@environments/environment";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";

describe("ContainerComponent", () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

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
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
