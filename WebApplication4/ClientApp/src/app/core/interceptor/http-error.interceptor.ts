import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from '../guards/auth.service';
import { MasterDataService } from '../index';
   
  @Injectable({
    providedIn: 'root'
  })
  export class HttpErrorInterceptor implements HttpInterceptor {
    constructor (
      private authService: AuthService,
      private masterData: MasterDataService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            this.masterData.isLoader = false;
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }

            if(error.status === 401 && error.statusText === 'Unauthorized' ) {
              this.authService.logout();
            }
            
            return throwError(error.error);
          })
        )
    }
   }