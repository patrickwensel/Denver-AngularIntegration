import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  currentDate: any;
  context: any;

  constructor() {
    this.currentDate = this.getCurrentDate();
  }

  getInstance(ins: string) {
    this.context = ins;
  }

  // This customized method will call internally built in $logProvider methods such as log, info, warn, debug and error.
  log(msg: any) {
    console.log(this.currentDate + ' - ' + this.context + ': ' + JSON.stringify(msg));
  }

  // Informative logging information. You may use string substitution and additional arguments with this method.
  info(msg: any) {
    // tslint:disable-next-line:no-console
    console.info(this.currentDate + ' - ' + this.context + ': ' + JSON.stringify(msg));
  }

  // Outputs a warning message. You may use string substitution and additional arguments with this method.
  warn(msg: any) {
    console.warn(this.currentDate + ' - ' + this.context + ': ' + JSON.stringify(msg));
  }

  /* For at least IE, Firefox and Chrome consoles, .debug() is just an alias for .log()added for improved compatibility */
  debug(msg: any) {
    // tslint:disable-next-line:no-console
    console.debug(this.currentDate + ' - ' + this.context + ': ' + JSON.stringify(msg));
  }

  // Outputs an error message. You may use string substitution and additional arguments with this method. Will consume the API
  error(msg: any) {
    console.error(
      this.currentDate + ' - ' + this.context + ': ' + JSON.stringify(msg)
    );
    if (window.sessionStorage.isDBErrorLogsRequired) {
      // Write a service call to save Error logs in Database.
    }
  }

  getCurrentDate() {
    try {
      const date = new Date();
      const aaaa = date.getFullYear();
      const gg = date.getDate();
      const mm = date.getMonth() + 1;
      let d: string;
      let m: string;

      if (gg < 10) {
        d = '0' + gg;
      } else {
        d = gg.toString();
      }

      if (mm < 10) {
        m = '0' + mm;
      } else {
        m = mm.toString();
      }

      const currentDay = m + '-' + d + '-' + aaaa;

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      let h: string;
      let min: string;
      let s: string;
      if (hours < 10) {
        h = '0' + hours;
      } else { h = hours.toString(); }

      if (minutes < 10) {
        min = '0' + minutes;
      } else { min = minutes.toString(); }

      if (seconds < 10) {
        s = '0' + seconds;
      } else { s = seconds.toString(); }

      return currentDay + ' ' + hours + ':' + minutes + ':' + seconds;
    } catch (error) { }
  }
}
