import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "orderBy", pure: false })
export class OrderByPipe implements PipeTransform {
  value: string[] = [];

  static _orderByComparator(a: any, b: any): number {
    if (a === null || typeof a === "undefined") {
      a = 0;
    }
    if (b === null || typeof b === "undefined") {
      b = 0;
    }

    if (
      isNaN(parseFloat(a)) ||
      !isFinite(a) ||
      isNaN(parseFloat(b)) ||
      !isFinite(b)
    ) {
      // Isn"t a number so lowercase the string to properly compare
      a = a.toString();
      b = b.toString();
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
    } else {
      // Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) {
        return -1;
      }
      if (parseFloat(a) > parseFloat(b)) {
        return 1;
      }
    }

    return 0; // equal each other
  }

  public transform(input: any, config: any = "+"): any {
    if (!input) {
      return input;
    }

    // make a copy of the input"s reference
    this.value = [...input];
    const value: any = this.value;
    if (!Array.isArray(value)) {
      return value;
    }

    if (
      !Array.isArray(config) ||
      (Array.isArray(config) && config.length === 1)
    ) {
      const propertyToCheck: string = !Array.isArray(config)
        ? config
        : config[0];
      const desc = propertyToCheck.substring(0, 1) === "-";

      // Basic array
      const array = value.sort((a, b) => a - b);
      if (
        !propertyToCheck ||
        propertyToCheck === "-" ||
        propertyToCheck === "+"
      ) {
        return !desc ? array : array.reverse();
      } else {
        const property: string =
          propertyToCheck.substring(0, 1) === "+" ||
          propertyToCheck.substring(0, 1) === "-"
            ? propertyToCheck.substring(1)
            : propertyToCheck;

        return value.sort((a: any, b: any) => {
          let aValue = a[property];
          let bValue = b[property];

          const propertySplit = property.split(".");

          if (
            typeof aValue === "undefined" &&
            typeof bValue === "undefined" &&
            propertySplit.length > 1
          ) {
            aValue = a;
            bValue = b;

            for (let value of propertySplit) {
              aValue = aValue[value];
              bValue = bValue[value];
            }
          }

          return !desc
            ? OrderByPipe._orderByComparator(aValue, bValue)
            : -OrderByPipe._orderByComparator(aValue, bValue);
        });
      }
    } else {
      // Loop over property of the array in order and sort
      return value.sort((a: any, b: any) => {
        for (let value of config) {
          const desc = value.substring(0, 1) === "-";
          const property =
            value.substring(0, 1) === "+" || value.substring(0, 1) === "-"
              ? value.substring(1)
              : value;

          let aValue = a[property];
          let bValue = b[property];

          const propertySplit = property.split(".");

          if (
            typeof aValue === "undefined" &&
            typeof bValue === "undefined" &&
            propertySplit.length > 1
          ) {
            aValue = a;
            bValue = b;

            for (let value of propertySplit) {
              aValue = aValue[value];
              bValue = bValue[value];
            }
          }

          const comparison = !desc
            ? OrderByPipe._orderByComparator(aValue, bValue)
            : -OrderByPipe._orderByComparator(aValue, bValue);

          // Don"t return 0 yet in case of needing to sort by next property
          if (comparison !== 0) {
            return comparison;
          }
        }

        return 0; // equal each other
      });
    }
  }
}
