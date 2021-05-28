import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { MasterDataService } from '../../configs/master-data';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(
      public localStorage: LocalstorageService,
      private masterData: MasterDataService
    ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `${this.localStorage.getLocalStorage(this.masterData.token)}`
      }
    });
    return next.handle(request);
  }
}
