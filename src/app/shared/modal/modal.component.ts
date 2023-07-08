import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalModel } from "@models/shared/modal.model";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent<T> {
  @Input() data: ModalModel<T>;
  @Output() deleteConfirmed: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.modalClosed.emit();
  }

  confirmDelete() {
    this.deleteConfirmed.emit(this.data.item);
  }
}
