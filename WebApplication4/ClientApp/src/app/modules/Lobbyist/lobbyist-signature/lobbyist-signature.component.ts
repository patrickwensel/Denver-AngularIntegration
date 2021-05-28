import { Component, ElementRef, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonMethods, ErrorMessageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';

import * as SignaturePadNative from 'signature_pad';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-lobbyist-signature',
  templateUrl: './lobbyist-signature.component.html',
  styleUrls: ['./lobbyist-signature.component.scss']
})
export class LobbyistSignatureComponent implements OnInit {

  @Output() backBtnEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() signaturePadEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() signatureEmitter: EventEmitter<any> = new EventEmitter<any>();
  hideRequiredMarker: boolean = true;
  static_data: any;
  LobbySignatureForm: FormGroup;

  public signaturePad: any='';
  public elementRef: ElementRef;
  options: any={};

  constructor(public commonMethods: CommonMethods,
    public masterData: MasterDataService,
    public snackbar: SnackbarService,
    public service: ClientService,
    public urlService: MasterUrlService,
    public errorService: ErrorMessageService, elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.options = this.options || { dotSize: 1, minWidth: 1000, minDistance: 0, canvasHeight: 300, canvasWidth: 1000 };
  }


  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.LobbySignature();
  }

  dataURLtoFile(dataurl: string, filename: string) {

    let arr: any = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }



  public ngAfterContentInit(): void {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    if ((this.options as any).canvasHeight) {
      canvas.height = (this.options as any).canvasHeight;
    }

    if ((this.options as any).canvasWidth) {
      canvas.width = (this.options as any).canvasWidth;
    }

    this.signaturePad = new SignaturePadNative.default(canvas, this.options);
    // this.signaturePad.onBegin = this.onBegin.bind(this);
    // this.signaturePad.onEnd = this.onEnd.bind(this);
  }

  savePng() {
    if (this.signaturePad.isEmpty()) {
      return alert("Please provide a signature first.");
    }

    var base64content = this.signaturePad.toDataURL('image/png');
    //Usage example:
    let file = this.dataURLtoFile(base64content, 'hello.png');
    // return;
    // console.log(data);
    // window.open(data);

    // const blobData = this.convertBase64ToBlobData(this.signaturePad);


    // if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
    //   window.navigator.msSaveOrOpenBlob(base64content, 'signature');
    // } else { // chrome
    //   const blob = new Blob([base64content],{type:"image/png"});
    //   const url = window.URL.createObjectURL(blob);
    //   // window.open(url);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = 'signature';
    //   link.click();
    // }
    // }
  }

  clear() {
    this.signaturePad.clear();
  }

  convertBase64ToBlobData(base64Data: string, contentType: string = 'image/png', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  LobbySignature() {
    this.LobbySignatureForm = new FormGroup({
      firstName: new FormControl("" || null,
        [Validators.minLength(2), Validators.maxLength(80), Validators.pattern(this.masterData.onlyAlpha)]),
      lastName: new FormControl("" || null,
        [Validators.minLength(2), Validators.maxLength(80), Validators.pattern(this.masterData.onlyAlpha)]),
      email: new FormControl("" || null,
        [Validators.maxLength(120),Validators.pattern(this.masterData.emailValidations)])
    })
  }


  // Submit Lobby
  submitLobbiestDetail() {
    if (this.LobbySignatureForm.valid) {
      if (this.signaturePad.isEmpty()) {
        return this.snackbar.snackbarError("Signature is required", this.masterData.centre)
      }
      this.signatureEmitter.emit(this.LobbySignatureForm.value)
      this.signaturePadEmitter.emit(this.signaturePad.toDataURL('image/png'));
      }
      else{
        this.LobbySignatureForm.markAllAsTouched();
      }
    }


      // let { firstName, lastName, email } = this.LobbySignatureForm.value;
      // let signatureInfo = {
      //   firstName,
      //   lastName,
      //   email,
      //   signature: this.signaturePad.toDataURL('image/png')

      //Need to change URL
  //     this.service.postData(this.urlService.committeeInformation, signatureInfo).subscribe((res: any) => {
  //       this.snackbar.snackbarSuccess("Lobbyist Information Updated Succesfully");
  //     }, err => {
  //       this.snackbar.snackbarError(this.masterData.errorMsg, this.masterData.centre);
  //     })
  //   }
  //   else {
  //     this.LobbySignatureForm.markAllAsTouched();
  //   }
  // }
  goBack(){
    this.backBtnEmitter.emit(5)
  }

}
