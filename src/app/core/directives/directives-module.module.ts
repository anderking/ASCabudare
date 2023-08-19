import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NumericInputDirective } from "./numeric-input.directive";

const directives = [NumericInputDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [...directives],
})
export class DirectivesModule {}
