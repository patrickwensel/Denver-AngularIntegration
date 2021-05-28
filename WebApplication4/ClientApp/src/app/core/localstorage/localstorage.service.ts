import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
  intervalCount: number = 1000 * 60;
  storageList = [];

  getLocalStorage(key: any) {
    let data = localStorage.getItem(key);
    if (key && data) {
      return JSON.parse(data);
    }
    return null;
  }

  setLocalStorageWithInterval(key: any | number, value: any) {
    this.setLocalStorage(key, value);
    // if (this.storageList.indexOf(key) === -1) {
    //   this.storageList.push(key);
    //   this.timeInterval([key]);
    // } else {
    //   clearTimeout(this.storageList[key]);
    //   this.timeInterval([key]);
    // }
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeStorage(keys: string[]) {
    keys.forEach(element => {
      localStorage.removeItem(element);
    });
  }

  clearAllStorage() {
    localStorage.clear();
  }

  timeInterval(key: string | number | any[]) {
  //   this.storageList[key] = setTimeout(() => {
  //     this.removeStorage(key);
  //     this.storageList.splice(this.storageList.indexOf(key), 1);
  //   }, this.intervalCount);
  }

}
