import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterTableSearchPipe } from "./filter-table-search.pipe";
import { MillionPipe } from "./million.pipe";
import { OrderByPipe } from "./orderBy.pipe";
import { AmountPipe } from "./amount.pipe";

const PIPES = [FilterTableSearchPipe, MillionPipe, OrderByPipe, AmountPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class PipesModule {}
