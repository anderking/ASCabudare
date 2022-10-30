import { Component, TemplateRef } from "@angular/core";
import { ToastService } from "@services/ui/toast.service";

@Component({
  selector: "app-toast-container",
  templateUrl: "./toast-container.component.html",
  styleUrls: ["./toast-container.component.css"],
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
