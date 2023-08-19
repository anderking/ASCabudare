import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appNumericInput]",
})
export class NumericInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.handleKeyEvent(event);
  }

  @HostListener("keypress", ["$event"])
  onKeypress(event: KeyboardEvent) {
    this.handleKeyEvent(event);
  }

  private handleKeyEvent(event: KeyboardEvent) {
    // Permitir teclas especiales como flechas izquierda, derecha, Inicio y Fin, borrar y pegar

    // Permitir coma y punto si no hay ninguno en el campo
    if (
      event.keyCode === 110 ||
      event.keyCode === 190 ||
      event.keyCode === 188
    ) {
      if (
        this.el.nativeElement.value.indexOf(",") != -1 ||
        this.el.nativeElement.value.indexOf(".") != -1
      ) {
        event.preventDefault();
        return;
      }
    }

    if (
      [8, 35, 36, 37, 39, 44, 46, 110, 188, 190].indexOf(event.keyCode) !==
        -1 ||
      // Permitir Ctrl+A / Command+A
      (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
      // Permitir Ctrl+C / Command+C
      (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
      // Permitir Ctrl+V / Command+V
      (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
      // Permitir Ctrl+X / Command+X
      (event.keyCode === 88 && (event.ctrlKey || event.metaKey))
    ) {
      return;
    }

    // Asegurarse de que la tecla presionada sea un número, un punto o una coma
    if (
      event.shiftKey ||
      ((event.keyCode < 48 || event.keyCode > 57) &&
        (event.keyCode < 96 || event.keyCode > 105) &&
        event.keyCode !== 190 &&
        event.keyCode !== 188)
    ) {
      event.preventDefault();
    }
  }
}
