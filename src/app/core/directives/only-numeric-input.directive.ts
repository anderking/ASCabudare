import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appOnlyNumericInput]",
})
export class OnlyNumericInputDirective {

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.handleKeyEvent(event);
  }

  @HostListener("keypress", ["$event"])
  onKeypress(event: KeyboardEvent) {
    this.handleKeyEvent(event);
  }

  private handleKeyEvent(event: KeyboardEvent) {
    // Permite Borrar, Tab, Fin, Inicio, Flecha izquierda y Flecha derecha
    if ([8, 9, 35, 36, 37, 39].indexOf(event.keyCode) !== -1) {
      return;
    }
    // Permite solo numeros del 0 al 9
    if (
      (event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105)
    ) {
      event.preventDefault();
    }
  }
}
