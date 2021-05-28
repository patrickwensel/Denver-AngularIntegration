import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MasterDataService } from 'src/app/core';

@Pipe({
    name: 'localDateTime'
})
export class LocalDateTimePipe extends DatePipe implements PipeTransform {
    private masterKey = new MasterDataService();
    transform(value: any): any {
        if (!value) {
            return value;
        } else {
            let tail = value.split('').pop(),
                dateObj;
            if (tail != "Z") {
                dateObj = new Date(`${value}Z`);
            } else {
                dateObj = new Date(value);
            }
            return super.transform(dateObj, this.masterKey.dateAndTime);
        }
    }
}
