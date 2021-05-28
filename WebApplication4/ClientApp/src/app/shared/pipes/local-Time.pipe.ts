import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localTime'
})
export class LocalTimePipe extends DatePipe implements PipeTransform {

  transform(value: any): any {
    // if (!value) {
    //   return value;
    // } else {
    //     const dateString = value.split('T')[0];
    //     const time = value.split('T')[1];
    //     const timeString = time.split('.')[0];
    //     const dateTimeString  = dateString + ' ' + timeString + ' UTC';
    //     return new Date(dateTimeString);
    // }

    if (value) {
      let splitDate = value.split('').pop();
      if (splitDate !== "Z") {
        let dateTime = value + 'Z';
        return new Date(dateTime);
      } else {
        return new Date(value);
      }
    } else {
      return '';
    }
  }

  getTimeZone() {
    const today = new Date();
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, { timeZoneName: 'short' });
    // Trying to remove date from the string in a locale-agnostic way
    const shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
      const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
      // by this time `trimmed` should be the timezone's name with some punctuation -
      // trim it from both sides
      return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');
    } else {
      // in some magic case when short representation of date is not present in the long one,
      // just return the long one as a fallback, since it should contain the timezone's name
      return full;
    }
  }
}
