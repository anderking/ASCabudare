import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { ModalModel } from "@models/shared/modal.model";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent<T> implements OnInit {
  @Input() data: ModalModel<T>;
  @Output() deleteConfirmed: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();
  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  constructor(private _authFacadeService: AuthFacadeService) {}

  ngOnInit() {
    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.numberOfDecimal =
          user && user.numberOfDecimal
            ? user.numberOfDecimal
            : this.numberOfDecimal;
        this.systemDecimal =
          user && user.systemDecimal ? user.systemDecimal : this.systemDecimal;
      });
  }

  closeModal() {
    this.modalClosed.emit();
  }

  confirmDelete() {
    this.deleteConfirmed.emit(this.data.item);
  }
}
