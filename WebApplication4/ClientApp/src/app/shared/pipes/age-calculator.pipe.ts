import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCalculator'
})
export class AgeCalculatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return 0;
    } else {
      const date = new Date();
      const diff = date.getTime() - new Date(value).getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
  }

}
