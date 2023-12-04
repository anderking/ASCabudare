import { Component, OnInit, inject } from "@angular/core";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";
import { AttachmentModel } from "@models/shared/attachment.model";
import { TranslateService } from "@ngx-translate/core";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { ToastService } from "@services/ui/toast.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
})
export class UploadFileComponent implements OnInit {
  private _attachmentFacadeService = inject(AttachmentFacadeService);
  private _translateService = inject(TranslateService);
  private _toastService = inject(ToastService);

  public isLoadingAttachment: boolean;
  public errorFiles = "";
  public currentFile: AttachmentModel = null;

  ngOnInit() {
    this._attachmentFacadeService
      .getUrlAttachment$()
      .pipe(filter((x) => !isNullOrUndefinedEmpty(x)))
      .subscribe(() => {
        this.currentFile = null;
      });
    this._attachmentFacadeService
      .getLoading$()
      .subscribe((loading) => (this.isLoadingAttachment = loading));
  }

  changeFile(event: any): void {
    const jpg = "image/jpg";
    const jpeg = "image/jpeg";
    const png = "image/png";
    const max_size = 1000000;
    const allowed_types = [jpg, jpeg, png];

    const filesInput = event.target.files;

    if (filesInput.length > 0) {
      for (let value of filesInput) {
        const currentFile: any = value;
        const extension = allowed_types.includes(currentFile.type);
        let isValid = true;

        if (!extension) {
          this.errorFiles = this._translateService.instant(
            "VALIDATIONS.VALID_FILE_EXTENSION"
          );
          isValid = false;
        }

        if (currentFile.size > max_size) {
          this.errorFiles =
            this._translateService.instant("VALIDATIONS.VALID_FILE_SIZE") +
            " " +
            max_size / 1000000 +
            "Mb";
          isValid = false;
        }
        if (isValid) {
          this.errorFiles = "";
          this.currentFile = currentFile;
        } else {
          this.currentFile = null;
        }
      }
    }
  }

  public uploadFile() {
    if (this.currentFile) {
      this._attachmentFacadeService.create(this.currentFile);
    } else {
      this._toastService.show(
        this._translateService.instant("VALIDATIONS.UPLOAD_FILE_REQUERID"),
        {
          classname: "bg-danger text-light",
          delay: 5000,
        }
      );
    }
  }
}
