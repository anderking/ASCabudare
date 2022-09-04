import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterTableSearchPipe } from "./filter-table-search.pipe";

const PIPES = [FilterTableSearchPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class PipesModule {}
