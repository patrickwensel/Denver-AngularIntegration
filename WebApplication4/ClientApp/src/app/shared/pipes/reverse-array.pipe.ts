import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReveseArray implements PipeTransform {

    transform(value: any[] | Date) {
        // return value.slice().reverse();
    }

}
