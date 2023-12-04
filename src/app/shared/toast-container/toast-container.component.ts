import { Component, TemplateRef, inject } from "@angular/core";
import { ToastService } from "@services/ui/toast.service";

@Component({
  selector: "app-toast-container",
  templateUrl: "./toast-container.component.html",
  styleUrls: ["./toast-container.component.scss"],
})
export class ToastContainerComponent {
  public toastService = inject(ToastService);

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
