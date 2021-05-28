import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionstorageService {

    setItemSessionStorage (key: string, value: string) {
        if(key) {
            sessionStorage.setItem(key, value);
        }
    }

    getItemSessionStorage (key: string) {
        if(key) {
            return sessionStorage.getItem(key);
        }
        return null;
    }

    removeItemSessionStorage (key: string) {
        if(key) {
            sessionStorage.removeItem(key);
        }
    }

    clearAllSessionStorage () {
        sessionStorage.clear();
    }

}