import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterTableSearchPipe } from "./filter-table-search.pipe";
import { OrderByPipe } from "./orderBy.pipe";
import { AmountPipe } from "./amount.pipe";
import { CustomDecimalPipe } from "./custom-decimal.pipe";

const pipes = [FilterTableSearchPipe, OrderByPipe, AmountPipe, CustomDecimalPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes],
  exports: [...pipes],
})
export class PipesModule {}
