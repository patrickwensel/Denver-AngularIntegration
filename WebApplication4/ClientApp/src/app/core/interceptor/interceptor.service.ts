import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MasterDataService } from '../../configs/master-data';
import { AuthService } from '../../core/guards/auth.service';
import { SnackbarService } from '../../core/snackbar/snackbar.service';
import { LocalstorageService } from '../../core/localstorage/localstorage.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  messageCodes: any;
  isArchive: any = true;
  constructor(
    private masterData: MasterDataService,
    private auth: AuthService,
    private snackbar: SnackbarService,
    private storage: LocalstorageService
  ) {
    this.isArchive = true;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // SET Header
    const token = this.storage.getLocalStorage(this.masterData.token);
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings[this.masterData.token] = token;
    }

    const newHeader = new HttpHeaders(headerSettings);
    request = request.clone({
      headers: newHeader
    });
    return next.handle(request).pipe(
      // REST API Error handler
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          switch ((error as HttpErrorResponse).status) {
            case 400:
              if (error.error && error.error.message) {
                this.snackbar.snackbarError(error.error.message, 'center');
              } else {
                this.snackbar.snackbarError('Status 400 error.', 'center');
              }
              return throwError(error);
            case 401:
              if (error.error && error.error.message) {
                this.snackbar.snackbarError(error.error.message, 'center');
              }
              this.auth.logout();
              return throwError(error);
            case 500:
              if (error.error && error.error.message) {
                this.snackbar.snackbarError(error.error.message, 'center');
              } else {
                this.snackbar.snackbarError('Status 500 error.', 'center');
              }
              return throwError(error);
            case 404:
              if (error.error && error.error.message) {
                this.snackbar.snackbarError(error.error.message, 'center');
              } else {
                this.snackbar.snackbarError('Status 404 error.', 'center');
              }
              console.log(error);
              return throwError(error);
            case 410:
              if (error.error && error.error.message) {
                this.snackbar.snackbarError(error.error.message, 'center');
              } else {
                this.snackbar.snackbarError('Status 410 error.', 'center');
              }
              console.log(error);
              return throwError(error);
            default:
              this.snackbar.snackbarError(error && error.error && error.error.message, 'center');
              return throwError(error);
          }
        } else {
          return throwError(error);
        }
        // this.common.hideLoader();
      }));
  }
}
