import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'million'
})
export class MillionPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {

  }
  transform(value: any, digits?: any): any {
    //console.log(value,digits)
    let valueFloat = parseFloat(value);
    if(isNaN(valueFloat))
    {
      return value;
    }else{
      return this.decimalPipe.transform(value, digits)
    }
  }

}