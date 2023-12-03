import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { UploadFileComponent } from "./upload-file.component";
import { Store } from "@ngrx/store";
import { storeMock } from "@root/core/constants/mocks/mocks";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@root/shared/shared.module";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";
import { mockTestAttachmentOne } from "@root/core/constants/mocks/mocks-units-test";
import { of } from "rxjs";

describe("UploadFileComponent", () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;
  let attachmentFacadeService: AttachmentFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
      declarations: [UploadFileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileComponent);
    attachmentFacadeService = TestBed.inject(AttachmentFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getUrlAttachment$ from attachmentFacadeService", () => {
    const mySpy = spyOn(
      attachmentFacadeService,
      "getUrlAttachment$"
    ).and.returnValue(of("string"));

    component.ngOnInit();

    expect(mySpy).not.toBeNull();
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should call create from attachmentFacadeService", () => {
    const data = mockTestAttachmentOne;
    component.currentFile = data;
    const mySpy = spyOn(attachmentFacadeService, "create");

    component.uploadFile();

    expect(mySpy).toHaveBeenCalledWith(data);
  });
});
