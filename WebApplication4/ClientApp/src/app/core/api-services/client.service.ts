import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { MasterDataService } from '../../configs/master-data';
import { MasterUrlService } from '../../configs/api-urls';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../guards/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private baseUrl = environment.baseUrl;
    public NPIDataUrl: string;

    constructor(
        private http: HttpClient,
        private urlService: MasterUrlService,
        private masterData: MasterDataService,
        private auth: AuthService,
        private snackbarService: SnackbarService
    ) {
        this.NPIDataUrl = '';
    }
    getData(url: string): Observable<any> {
        this.masterData.isLoader = true;
        return this.http.get(this.baseUrl + url).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                if(response.hasError && response.errorCode==401){
                    this.snackbarService.snackbarError(
                        response.message ? response.message : "Unauthorized access",
                        "center"
                      );
                    this.auth.logout();
                    return;
                }
                return response;
            } else {
                return [];
            }
        }));
    }

    getWithData(url: any, data: any): Observable<any> {
        this.masterData.isLoader = true;

        let params = new HttpParams();
        if (typeof data === 'object') {
            for (let key in data) {
                params = params.append(key, data[key]);
            }
        }


        return this.http.get(this.baseUrl + url, { params: params }).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                if(response.hasError && response.errorCode==401){
                    this.snackbarService.snackbarError(
                        response.message ? response.message : "Unauthorized access",
                        "center"
                      );
                    this.auth.logout();
                    return;
                }
                return response;
            } else {
                return [];
            }
        }));
    }

    postData(url: any, data: { [x: string]: any; OrderID?: any; }): Observable<any> {
        // const userName = "";//JSON.parse(localStorage.getItem('uName'));
        // if(userName) {
        //     data['loginUserName'] = userName;
        // }
        this.masterData.isLoader = true;
        return this.http.post(this.baseUrl + url, data).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                if(response.hasError && response.errorCode==401){
                    this.snackbarService.snackbarError(
                        response.message ? response.message : "Unauthorized access",
                        "center"
                      );
                    this.auth.logout();
                    return;
                }
                return response;
            } else {
                return [];
            }
        }));
    }

    postDataParams(url: any, data: any): Observable<any> {
        this.masterData.isLoader = true;
        return this.http.post(this.baseUrl + url, data).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                if(response.hasError && response.errorCode==401){
                    this.snackbarService.snackbarError(
                        response.message ? response.message : "Unauthorized access",
                        "center"
                      );
                    this.auth.logout();
                    return;
                }
                return response;
            } else {
                return [];
            }
        }));
    }

    postFormData(url: any, data: { DocumentID: string | Blob; DocumentName: string | Blob; PageRange: string | Blob; }): Observable<any> {
        this.masterData.isLoader = true;
        const HttpUploadOptions = {
            headers: new HttpHeaders({ 'Content-Type': "" })
        };
        const splitReq = new FormData();
        splitReq.append('DocumentID', data.DocumentID);
        splitReq.append('DocumentName', data.DocumentName);
        splitReq.append('Directory', 'SourceFile');
        splitReq.append('PageRange', data.PageRange);
        return this.http.post(this.baseUrl + url, splitReq).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                return response;
            } else {
                return [];
            }
        }));
    }

    postDocument(url: any, data: any): Observable<any> {
        this.masterData.isLoader = true;
        const HttpUploadOptions = {
            
            headers: new HttpHeaders({ 'Content-Type': "" })
        };
        return this.http.post(this.baseUrl + url, data).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                return response;
            } else {
                return [];
            }
        }));
    }


    putData(url: any, data: any): Observable<any> {
        this.masterData.isLoader = true;
        return this.http.put(this.baseUrl + url, data).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                return response;
            } else {
                return [];
            }
        }));
    }

    delete(url: any): Observable<any> {
        this.masterData.isLoader = true;
        return this.http.delete(this.baseUrl + url).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                return response;
            } else {
                return [];
            }
        }));
    }

    deleteWithData(url: any, data: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | string[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }): Observable<any> {
        this.masterData.isLoader = true;
        return this.http.delete(this.baseUrl + url, data).pipe(map((response: any) => {
            this.masterData.isLoader = false;
            if (response) {
                return response;
            } else {
                return [];
            }
        }));
    }

    displayPDF(url: string, data: {}) {
        return this.http.post(this.baseUrl + url, data, { responseType: 'blob' });
    }


    // Please Use this type of form data or Json creation inside the particular file itself.
    // We should not pass this as a seperate params. Its should be single param as json format.
}
