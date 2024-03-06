import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NumericInputDirective } from "./numeric-input.directive";
import { OnlyNumericInputDirective } from "./only-numeric-input.directive";

const directives = [NumericInputDirective, OnlyNumericInputDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [...directives],
})
export class DirectivesModule {}
