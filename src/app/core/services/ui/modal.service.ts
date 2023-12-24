import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "@root/shared/modal/modal.component";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  openModal(data: any): Promise<any> {
    this.modalRef = this.modalService.open(ModalComponent);
    this.modalRef.componentInstance.data = data;
    return new Promise<any>((resolve, reject) => {
      this.modalRef.componentInstance.deleteConfirmed.subscribe(
        (record: any) => {
          resolve(record);
          this.modalRef.close();
        }
      );
      this.modalRef.componentInstance.modalClosed.subscribe(() => {
        reject(new Error("Closed"));
        this.modalRef.close();
      });

      this.modalRef.componentInstance.resultCalculate.subscribe(
        (record: number) => {
          resolve(record);
          this.modalRef.close();
        }
      );
    });
  }
}
