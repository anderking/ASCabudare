import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDecimal",
})
export class CustomDecimalPipe implements PipeTransform {
  transform(
    value: number | string,
    format: string = "comma",
    decimalCount: string = "2"
  ): string {
    if (value == null) {
      return "";
    }
    const decimalCountFloat = parseFloat(decimalCount);

    const normalizedValue =
      typeof value === "string" ? value.replace(",", ".") : value.toString();

    const parts = normalizedValue.split(".");
    let formattedValue = "";

    if (format === "comma") {
      formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      if (parts.length > 1) {
        const roundedDecimals = parseFloat(`0.${parts[1] || "0"}`)
          .toFixed(decimalCountFloat)
          .substring(2);
        formattedValue += `,${roundedDecimals}`;
      } else {
        formattedValue += `,${"0".repeat(decimalCountFloat)}`;
      }
    } else if (format === "dot") {
      formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length > 1) {
        const roundedDecimals = parseFloat(`0.${parts[1] || "0"}`)
          .toFixed(decimalCountFloat)
          .substring(2);
        formattedValue += `.${roundedDecimals}`;
      } else {
        formattedValue += `.${"0".repeat(decimalCountFloat)}`;
      }
    }

    return formattedValue;
  }
}
