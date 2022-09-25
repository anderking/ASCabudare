import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterTableSearch",
})
export class FilterTableSearchPipe implements PipeTransform {
  transform(value: any[], arg: string, field: string): any {
    const itemsFilter = [];
    for (const item of value) {
      if (item[field].toLowerCase()?.indexOf(arg?.toLowerCase()) > -1) {
        itemsFilter.push(item);
      }
    }
    return itemsFilter;
  }
}
