import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
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
  @Output() resultCalculate: EventEmitter<number> = new EventEmitter<number>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  private _authFacadeService = inject(AuthFacadeService);

  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  ngOnInit() {
    console.log(this.data);
    this._authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.numberOfDecimal = user?.numberOfDecimal
          ? user.numberOfDecimal
          : this.numberOfDecimal;
        this.systemDecimal = user?.systemDecimal
          ? user.systemDecimal
          : this.systemDecimal;
      });
  }

  closeModal() {
    this.modalClosed.emit();
  }

  confirmDelete() {
    this.deleteConfirmed.emit(this.data.item);
  }

  resultEmit(result: number) {
    this.resultCalculate.emit(result);
  }
}
