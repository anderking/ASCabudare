import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "amount",
})
export class AmountPipe implements PipeTransform {
  transform(items: any[], field: string): any {
    let acumValue = 0;
    items.forEach((element: any) => {
      const valueFloat = parseFloat(element[field]);
      acumValue += valueFloat;
    });
    return acumValue;
  }
}
